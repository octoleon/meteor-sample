import _ from "lodash";
import Logger from "@reactioncommerce/logger";
import { Meteor } from "meteor/meteor";
import { Match } from "meteor/check";

/**
 * @file **Method Hooks for Meteor** - Use a hook to run something before or after a method on the server
 * Reused Meteor method hooks from [hitchcott/meteor-method-hooks](https://github.com/hitchcott/meteor-method-hooks) and [Workpop/meteor-method-hooks](https://github.com/Workpop/meteor-method-hooks)
 * Read more on how to use [Method Hooks](https://docs.reactioncommerce.com/reaction-docs/master/method-hooks).
 * @example MethodHooks.after('orders/orderCompleted', callback)
 * @namespace MethodHooks
 */
export const MethodHooks = {};

/**
 * @summary A collection of after hooks
 * @type {Object}
 * @summary <String, [Hook]> A mapping from method names to arrays of hooks
 * @private
 */
MethodHooks._afterHooks = {};

/**
 * @summary A collection of before hooks
 * @type {Object}
 * @summary <String, [Hook]> A mapping from method names to arrays of hooks
 * @private
 */
MethodHooks._beforeHooks = {};

/**
 * @summary The method handler definitions appropriate to the environment
 * @private
 */
MethodHooks._handlers = Meteor.isClient ? Meteor.connection._methodHandlers :
  Meteor.server.method_handlers;

/**
 * @summary The original method handlers
 * @type {Object}
 * @returns <String, Function> Method handler mapping
 * @private
 */
MethodHooks._originalMethodHandlers = {};

/**
 * @type {Object}
 * @summary <String, Function> A mapping from method names to method functions
 * @private
 */
MethodHooks._wrappers = {};

/**
 * @summary Initializes a new hook
 * @param {String} mapping - map hook: a is  place to store the mapping
 * @param {String} methodName - The name of the method
 * @param {Function} hookFunction - The hook function
 * @return {String} - returns transformed data
 * @private
 */
MethodHooks._initializeHook = function (mapping, methodName, hookFunction) {
  mapping[methodName] = mapping[methodName] || [];
  mapping[methodName].push(hookFunction);

  // Initialize a wrapper for the given method name. Idempotent, it will not erase existing handlers.
  const method = MethodHooks._handlers[methodName];
  // If no method is found, or a wrapper already exists, return
  if (!method || MethodHooks._wrappers[methodName]) {
    return;
  }

  // Get a reference to the original handler
  MethodHooks._originalMethodHandlers[methodName] = method;

  MethodHooks._wrappers[methodName] = function (...inputArgs) {
    // Get arguments you can mutate
    const args = _.toArray(inputArgs);
    let beforeResult;
    let hooksProcessed = 0;

    // Call the before hooks
    const beforeHooks = MethodHooks._beforeHooks[methodName] || [];
    for (const beforeHook of beforeHooks) {
      beforeResult = Promise.await(beforeHook.call(this, {
        result: undefined,
        error: undefined,
        arguments: args,
        hooksProcessed
      }));

      hooksProcessed += 1;

      if (beforeResult === false) {
        check(args, [Match.Any]);
        return false;
      }
    }

    let methodResult;
    let methodError;

    // Call the main method body
    // check(args, Match.Any);
    try {
      methodResult = Promise.await(MethodHooks._originalMethodHandlers[methodName].apply(this, args));
    } catch (error) {
      methodError = error;
    }

    // Call after hooks, providing the result and the original arguments
    const afterHooks = MethodHooks._afterHooks[methodName] || [];
    hooksProcessed = 0;
    for (const afterHook of afterHooks) {
      const hookResult = Promise.await(afterHook.call(this, {
        result: methodResult,
        error: methodError,
        arguments: args,
        hooksProcessed
      }));
      // If the after hook did not return a value and the methodResult is not undefined, warn and fix
      if (hookResult === undefined && methodResult !== undefined) {
        Logger.warn("Expected the after hook to return a value.");
      } else {
        methodResult = hookResult;
      }

      hooksProcessed += 1;
    }

    // If an error was thrown, throw it after the after hooks. Ought to include the correct stack information
    if (methodError) {
      throw methodError;
    }

    // Return the method result, possibly modified by the after hook
    return methodResult;
  };

  // Assign to a new handler
  MethodHooks._handlers[methodName] = MethodHooks._wrappers[
    methodName];
};

/**
 * @method before
 * @memberof MethodHooks
 * @summary Add a function to call before the specified method
 * @param {String} methodName - methodName
 * @param {String} beforeFunction - beforeFunction
 * @return {String} - returns transformed data, Ignored for before hooks
 */
MethodHooks.before = function (methodName, beforeFunction) {
  MethodHooks._initializeHook(
    MethodHooks._beforeHooks,
    methodName, beforeFunction
  );
};

/**
 * @method after
 * @memberof MethodHooks
 * @summary Add a function to call after the specified method
 * After hooks can change the result values. Use `hooksProcessed` to keep track of how many modifications have been made. You can mutate the return value in after hooks.
 * @param {String} methodName - methodName
 * @param {String} afterFunction - afterFunction
 * @return {String} - returns transformed data, Passed as the methodResult to subsequent method hooks.
 */
MethodHooks.after = function (methodName, afterFunction) {
  MethodHooks._initializeHook(
    MethodHooks._afterHooks,
    methodName, afterFunction
  );
};

/**
 * @method beforeMethods
 * @memberof MethodHooks
 * @summary Call the provided hook in values for the key'd method names
 * @param {Object} dict - <string, Hook> dict
 * @return {String} - returns transformed data, Ignored for before hooks
 */
MethodHooks.beforeMethods = function (dict) {
  _.each(dict, (val, key) => {
    MethodHooks.before(key, val);
  });
};

/**
 * @method afterMethods
 * @memberof MethodHooks
 * @summary Call the provided hook in values for the key'd method names
 * @param {Object} dict - <string, Hook> dict
 * @return {String} - returns transformed data, Passed as the methodResult to subsequent method hooks.
 */
MethodHooks.afterMethods = function (dict) {
  _.each(dict, (val, key) => {
    MethodHooks.after(key, val);
  });
};

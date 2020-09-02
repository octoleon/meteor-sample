# Reaction Commerce

[![Circle CI](https://circleci.com/gh/reactioncommerce/reaction.svg?style=svg)](https://circleci.com/gh/reactioncommerce/reaction) [![Gitter](https://badges.gitter.im/JoinChat.svg)](https://gitter.im/reactioncommerce/reaction?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Open Source Helpers](https://www.codetriage.com/reactioncommerce/reaction/badges/users.svg)](https://www.codetriage.com/reactioncommerce/reaction)


[Reaction](http://reactioncommerce.com) is an event-driven, real-time reactive commerce platform built with JavaScript (ES6). It plays nicely with npm, Docker, and React.

![Reaction v.1.x](https://raw.githubusercontent.com/reactioncommerce/reaction-docs/master/assets/Reaction-Commerce-Illustration-BG-800px.png)

## Features

Reaction’s out-of-the-box core features include:

-   Drag-and-drop merchandising
-   Order processing
-   Payments
-   Shipping
-   Taxes
-   Discounts
-   Analytics
-   Integration with dozens of third-party apps
-   See full list of features on our [Roadmap](https://reactioncommerce.com/roadmap)

Since anything in our codebase can be extended, overwritten, or installed as a package, you may also develop, scale, and customize anything on our platform.

# Getting started

### Requirements

Reaction requires Meteor, Git, MongoDB, OS-specific build tools and optionally, ImageMagick. For step-by-step instructions, check out this [page](https://docs.reactioncommerce.com/reaction-docs/master/installation).

### Install and create your first store

Install the [Reaction CLI](https://github.com/reactioncommerce/reaction-cli) to get started with Reaction:

```bash
npm install -g reaction-cli
```

Create your store:

```bash
reaction init
cd reaction
reaction
```

You can also run the app locally using [`docker-compose`](https://docs.docker.com/compose/) by running:

```sh
docker-compose up
```

This will use the `docker-compose.yml` file. This can be used to evaluate the app locally (on all Operating Systems supported by Docker),
however, for active local development or customization, it is better to run `reaction` outside of Docker for faster app builds.

Learn more on how to [configure your project](https://docs.reactioncommerce.com/reaction-docs/master/configuration).

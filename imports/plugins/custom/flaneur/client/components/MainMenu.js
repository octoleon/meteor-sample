import React, { Component } from 'react';
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
import PropTypes from 'prop-types';

export default class MainMenu extends Component {
  static propTypes = {
    mainMenu: PropTypes.array,
    onMenuItemClick: PropTypes.func.isRequired};

  render () {
    const { mainMenu, onMenuItemClick } = this.props;
    return (



      <header className="menu" role="banner">

          <div className="sign-in-block">

        <ul className="nav navbar-nav menu" id="main-menu">
          {mainMenu.map((menuItem, index) => {
            const { label, path, children } = menuItem;
            if (children && children.length) {
              return (
                <li className="dropdown" key={`top-item-${index}`}>
                  <a
                    className="dropdown-toggle"
                    onClick={(e) => onMenuItemClick(e, path)}
                    href={path}
                  >
                    {label}
                  </a>
                  <ul className="dropdown-menu">
                    {children.map((child, childIndex) => {
                      return (
                        <li key={`child-item-${index}-${childIndex}`}>
                          <a
                            onClick={(e) => onMenuItemClick(e, child.path)}
                            href={child.path}
                          >
                            {child.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            } else {
              return (
                <li className="dropdown" key={`top-item-${index}`}>
                  <a
                    onClick={(e) => onMenuItemClick(e, path)}
                    href={path}
                  >
                    {label}
                  </a>
                </li>
              );
            }
          })}

        </ul>
        </div>
      </header>



    );
  }
}

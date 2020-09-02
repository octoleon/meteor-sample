import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { arrayMove } from '/imports/plugins/custom/flaneur/lib/helpers';
const SortableTopMenuList = Loadable({
  loader: async () => {
    const component = await import ('../components/SortableTopMenuList');
    return component.default;
  },
  loading: () => null
});

export default class ManageMainMenuContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      mainMenu: [],
      isAddMode: false,
      // Add form fields
      parent: '',
      label: '',
      path: ''
    };
  }

  componentDidMount () {
    Meteor.call('MainMenu.get', (err, mainMenu) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ mainMenu });
      }
    });
  }

  handleMenuItemAdd = e => {
    e.preventDefault();
    const { mainMenu, label, path, parent } = this.state;
    if (parent === '') {
      mainMenu.push({
        label,
        path
      });
    } else {
      const parentIndex = Number(parent);
      if (!mainMenu[parentIndex].children) {
        mainMenu[parentIndex].children = [];
      }
      mainMenu[parentIndex].children.push({
        label,
        path
      });
    }

    this.setState({
      mainMenu,
      isAddMode: false,
      label: '',
      path: '',
      parent: ''
    });
  };

  handleTopMenuSortEnd = ({oldIndex, newIndex}) => {
    let { mainMenu } = this.state;
    mainMenu = arrayMove(mainMenu, oldIndex, newIndex);
    this.setState({ mainMenu });
  };

  handleChildMenuSortEnd = (parentItem, oldIndex, newIndex) => {
    const { mainMenu } = this.state;
    const parentIndex = this.getMenuItemIndex(parentItem, mainMenu);
    const children = arrayMove(mainMenu[parentIndex].children, oldIndex, newIndex);
    mainMenu[parentIndex].children = children;
    this.setState({ mainMenu });
  };

  getMenuItemIndex = (menuItem, menu) => {
    return menu.findIndex(item => {
      const { label, path } = item;
      return label === menuItem.label && path === menuItem.path;
    });
  };

  handleItemRemove = item => {
    const { mainMenu } = this.state;
    const itemRemoveIndex = this.getMenuItemIndex(item, mainMenu);
    mainMenu.splice(itemRemoveIndex, 1);
    this.setState({ mainMenu });
  };

  handleChildItemRemove = (parentItem, item) => {
    const { mainMenu } = this.state;
    const parentItemIndex = this.getMenuItemIndex(parentItem, mainMenu);
    const childItemIndex = this.getMenuItemIndex(item, mainMenu[parentItemIndex].children);
    mainMenu[parentItemIndex].children.splice(childItemIndex, 1);
    this.setState({ mainMenu });
  };

  handleAddBtnClick = e => {
    this.setState({
      isAddMode: true,
      label: '',
      path: ''
    });
  };

  handleCancelClick = e => {
    e.preventDefault();
    this.setState({
      isAddMode: false,
      label: '',
      path: ''
    });
  };

  handleAddInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSave = e => {
    Meteor.call('MainMenu.update', this.state.mainMenu, err => {
      if (err) {
        alert(err.reason);
      } else {
        Alerts.toast('Main menu saved');
      }
    });
  };

  render () {
    const { mainMenu, isAddMode, label, path } = this.state;
    return (
      <div id="manage-main-menu-container">
        {!isAddMode && (
          <div className="form-group">
            <button className="btn btn-primary" onClick={this.handleAddBtnClick}>+ Add menu item</button>
          </div>
        )}
        {isAddMode && (
          <form onSubmit={this.handleMenuItemAdd}>
            <div className="form-group rui">
              <div>
                <label>Add Menu Item</label>
              </div>
              <div>
                Parent&nbsp;&nbsp;
                <select name="parent" className="parent-dropdown" onChange={this.handleAddInputChange}>
                  <option key="none" value="">None</option>
                  {mainMenu.length && mainMenu.map((item, index) => {
                    const { label } = item;
                    return (
                      <option key={index} value={index}>{label}</option>
                    )
                  })}
                </select>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Label"
                  name="label"
                  value={label}
                  onChange={this.handleAddInputChange}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Path (starting with /)"
                  name="path"
                  value={path}
                  onChange={this.handleAddInputChange}
                />
              </div>
            </div>
            <div className="add-btn-container">
              <input type="submit" className="btn btn-primary" value="Add" />
              &nbsp;&nbsp; <a href="javascript:void(0)" onClick={this.handleCancelClick}>Cancel</a>
            </div>
          </form>
        )}
        <div className="form-group">
          {!mainMenu.length && (
            <p>No menu items yet.</p>
          )}
          <SortableTopMenuList
            items={mainMenu}
            onSortEnd={this.handleTopMenuSortEnd}
            useDragHandle={true}
            onItemRemove={this.handleItemRemove}
            onChildSortEnd={this.handleChildMenuSortEnd}
            onChildItemRemove={this.handleChildItemRemove}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-default" onClick={this.handleSave}>Save</button>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import { Reaction, Router } from '/client/api';
import Blaze from "meteor/gadicc:blaze-react-component";

export default class PageContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      isNotFound: false
    }
  }

  componentDidMount () {
    const path = Router.getParam('path');
    this.loadPage(path);
  }

  loadPage = path => {
    Meteor.call('Pages.get', path, (err, page) => {
      if (err) {
        alert(err.reason);
      } else if (page) {
        this.setState({
          path,
          ...page
        });
        // Add meta description
        Reaction.DOM.setMetaTag({
          name: 'description',
          content: page.description
        });
        // Set page title
        document.title = page.title;
        // Tell prerender.io that our page is ready
        window.prerenderReady = true;
      } else {
        this.setState({ isNotFound: true });
      }
    });
  };

  componentDidUpdate () {
    const path = Router.getParam('path');
    if (path !== this.state.path) {
      this.loadPage(path);
    }
  }

  render () {
    const { title, body, isNotFound } = this.state;
    return (
      <div className="page-container">
        {title && (
          <h1 className="page-title">{title}</h1>
        )}
        {body && (
          <div className="page-body" dangerouslySetInnerHTML={{__html: body}} />
        )}
        {isNotFound && (
          <Blaze template={Template.notFound} />
        )}
      </div>
    )
  }
}

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ImageUploadField from '../components/ImageUploadField';
import Autocomplete from '/imports/plugins/custom/flaneur/client/components/Autocomplete';

export default class ManageHomepageTopSellersContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      formFields: {
        title: '',
        products: []
      },
      productOptions: [],
      colorOptions: [],
      areProductsLoading: false,
      areColorsLoading: false
    };
  }

  componentDidMount () {
    Meteor.call('Flaneur.getHomepageTopSellers', (err, formFields) => {
      this.setState({ formFields });
    });
  }

  handleUpdateHomepageTopSellers = e => {
    e.preventDefault();
    const { formFields } = this.state;
    Meteor.call('Flaneur.updateHomepageTopSellers', formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        alert('Your changes have been saved.');
      }
    });
  };

  handleInputChange = e => {
    const { formFields } = this.state;
    formFields[e.target.name] = e.target.value;
    this.setState({ formFields });
  };

  handleProductSearch = query => {
    this.setState({ areProductsLoading: true });
    Meteor.call('Flaneur.productAutocompleteSearch', query, (err, productOptions) => {
      this.setState({
        productOptions,
        areColorsLoading: false
      });
    });
  };

  handleColorSearch = query => {
    this.setState({ areColorsLoading: true });
    Meteor.call('Colors.autocompleteSearch', query, (err, colorOptions) => {
      this.setState({
        colorOptions,
        areColorsLoading: false
      });
    });
  };

  handleProductAdd = () => {
    const { productOptions, colorOptions, formFields } = this.state;
    const product = productOptions.find(product => {
      return product.title === $('#product-autocomplete input').val();
    });
    const color = colorOptions.find(color => {
      return color.name === $('#color-autocomplete input').val();
    });
    if (product && color) {
      const existing = formFields.products.find(existingProduct => {
        const { id, colorId } = existingProduct;
        return id === product._id && colorId === color._id;
      });
      if (existing) {
        return alert(`${product.title} in ${color.name} already exists.`);
      }
      formFields.products.push({
        id: product._id,
        title: product.title,
        colorId: color._id,
        colorName: color.name
      });
      this.setState({ formFields });
      this.productAutocomplete._typeahead.getInstance().clear();
      this.colorAutocomplete._typeahead.getInstance().clear();
    }
  };

  handleProductRemove = id => {
    const { formFields } = this.state;
    const index = formFields.products.findIndex(product => product.id === id);
    formFields.products.splice(index, 1);
    this.setState({ formFields });
  };

  render () {
    const {
      formFields,
      productOptions,
      colorOptions,
      areProductsLoading,
      areColorsLoading
    } = this.state;
    const { title, products } = formFields;

    return (
      <div id="manage-homepage-top-sellers-container">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Products</label>
          <ul className="list-group">
            {products.map(product => {
              const { id, title, colorId, colorName } = product;
              return (
                <li key={`${id}-${colorId}`} className="list-group-item">
                  <strong>{title}</strong> in {colorName} -
                  &nbsp;<a href="javascript:void(0)" onClick={() => this.handleProductRemove(id)}>Remove</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="form-group">
          <div className="labels">
            <label>Product</label>
            <label>Color</label>
          </div>
          <div className="autocompletes">
            <div id="product-autocomplete">
              <Autocomplete
                ref={ref => this.productAutocomplete = ref}
                labelKey="title"
                placeholder="Enter a product title..."
                options={productOptions}
                isLoading={areProductsLoading}
                onSearch={this.handleProductSearch}
              />
            </div>
            <div id="color-autocomplete">
              <Autocomplete
                ref={ref => this.colorAutocomplete = ref}
                labelKey="name"
                placeholder="Enter a color name..."
                options={colorOptions}
                isLoading={areColorsLoading}
                onSearch={this.handleColorSearch}
              />
            </div>
          </div>
          <button className="btn btn-default" onClick={this.handleProductAdd}>+ Add</button>
        </div>
        <button className="btn btn-default" onClick={this.handleUpdateHomepageTopSellers}>Save</button>
      </div>
    );
  }
}

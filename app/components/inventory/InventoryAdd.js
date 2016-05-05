import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import RaisedButton from 'material-ui/lib/raised-button';
import {Router, Route, Link, RouteHandler} from 'react-router';
import { hashHistory } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import KEYS from '../../config/KEYS';

const styles = {
  colorField: {
    width: '100%'
  },
  smallPrice: {
    width: '90px'
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  contentContainerStyle: {
    margin: 0
  },
  tabsStyle: {
    zIndex: 1200,
    width: '100%'
  },
  tabStyle: {
    background: '#009688'
  },
  tabItemContainer: {
  }
}

const InventoryAdd = React.createClass({
  getInitialState: function() {
    return {
      inventoryAddAjaxRan: false,
      nameInput: "",
      brandInput: "",
      sizeInput: "",
      colorInput: "",
      purchaseDateInput: "",
      purchasedFromInput: "",
      priceInput: "",
      taxesInput: "",
      shippingInput: "",
      customsInput: "",
      totalCostInput: "",
      imageUrl: "app/images/no-image.png",
      tabState: "a",
      imageSearchRan: false,
      imageAjaxSuccess: false,
      imageAjaxReturn: []
    }
  },
  imageSearch: function() {
    axios.get('https://www.googleapis.com/customsearch/v1?key=' + KEYS.GOOGLE_API_KEY + '&cx=' + KEYS.GOOGLE_CX + '&q=bananas&searchType=image')
    .then(function(response) {
      console.log("response:", response);
      }.bind(this))
      .catch(function(err){
        console.warn('Error:', err);
        return err;
      })
    },
  componentWillMount: function() {
    this.imageSearch();
  },
  addInventory: function() {
    //This function runs the ajax request (CREATE) to add an item to the inventory
    axios.post('http://localhost:3000/items', {
      name: this.state.nameInput,
      brand: this.state.brandInput,
      size: this.state.sizeInput,
      color: this.state.colorInput,
      purchase_date: this.state.purchaseDateInput,
      purchased_from: this.state.purchasedFromInput,
      cost_price: this.state.priceInput,
      taxes: this.state.taxesInput,
      shipping_cost: this.state.shippingInput,
      customs_fees: this.state.customsInput,
      total_cost: this.state.totalCostInput,
      image_url: this.state.imageUrl
    })
    .then(function(response) {
      this.setState({
        inventoryAddAjaxRan: true
      })
      hashHistory.push('inventory');
    }.bind(this))
    .catch(function(err){
      console.warn("Error:", err);
      return err;
    })
  },
  handleNameInputChange: function() {
    //This function and the following 'handle' functions change the states for each field when text is entered or a date is selected
      this.setState({
        nameInput: document.getElementById('name-input').value
      })
  },
  handleBrandInputChange: function() {
      this.setState({
        brandInput: document.getElementById('brand-input').value
      })
  },
  handleSizeInputChange: function() {
      this.setState({
        sizeInput: document.getElementById('size-input').value
      })
  },
  handleColorInputChange: function() {
      this.setState({
        colorInput: document.getElementById('color-input').value
      })
  },
  handlePurchaseDateInputChange: function() {
      this.setState({
        purchaseDateInput: document.getElementById('purchase-date-input').value
      })
  },
  handlePurchasedFromInputChange: function() {
      this.setState({
        purchasedFromInput: document.getElementById('purchased-from-input').value
      })
  },
  handlePriceInputChange: function() {
      this.setState({
        priceInput: document.getElementById('price-input').value
      })
  },
  handleTaxesInputChange: function() {
      this.setState({
        taxesInput: document.getElementById('taxes-input').value
      })
  },
  handleShippingInputChange: function() {
      this.setState({
        shippingInput: document.getElementById('shipping-input').value
      })
  },
  handleCustomsInputChange: function() {
      this.setState({
        customsInput: document.getElementById('customs-input').value
      })
  },
  handleTotalCostInputChange: function() {
      this.setState({
        totalCostInput: document.getElementById('total-cost-input').value
      })
  },
  handleTabChange: function(value) {
    this.setState({
      tabState: value
    })
  },
  handleImageSearch: function() {
    if (this.state.imageSearchRan === false) {

    }
  },
  handleImageView: function() {
    if (this.state.imageAjaxSuccess === true) {
      return (
        <p>test 1</p>
      )
    } else {
      return (
        <p>Nothing ran</p>
      )
    }
  },
  render: function() {
    return (
      <div className="inventory-add">
        <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.tabsStyle}
        tabItemContainerStyle={styles.tabItemContainer}
      >
          <Tab label="Info" value="a" style={styles.tabStyle}>
            <div className="inventory-add-info-tab">
              <div className="form-row form-row-one">
                <TextField
                  hintText='Air Jordan 6 "Infrared" (2010)'
                  floatingLabelText="Name"
                  className="text-field inventory-add-text-field"
                  id="name-input"
                  onChange={this.handleNameInputChange}
                  />
                <TextField
                  hintText='Nike'
                  floatingLabelText="Brand"
                  className="text-field inventory-add-text-field"
                  id="brand-input"
                  value={this.state.brandInput}
                  onChange={this.handleBrandInputChange}
                  />
              </div>
              <div className="form-row form-row-two">
                <TextField
                  hintText='9'
                  floatingLabelText="Size"
                  className="text-field inventory-add-text-field"
                  id="size-input"
                  value={this.state.sizeInput}
                  onChange={this.handleSizeInputChange}
                  />
                <TextField
                  hintText='Black / Varsity Red'
                  floatingLabelText="Color"
                  className="text-field inventory-add-text-field"
                  id="color-input"
                  value={this.state.colorInput}
                  onChange={this.handleColorInputChange}
                  />
              </div>
              <div className="form-row form-row-three">
                <DatePicker
                  floatingLabelText="Purchase Date"
                  floatingLabelStyle={{zIndex:0}}
                  className="text-field inventory-add-text-field"
                  id="purchase-date-input"
                  onChange={this.handlePurchaseDateInputChange}
                  />
                <TextField
                  hintText='Nike'
                  floatingLabelText="Purchased From"
                  className="text-field inventory-add-text-field"
                  id="purchased-from-input"
                  value={this.state.purchasedFromInput}
                  onChange={this.handlePurchasedFromInputChange}
                  />
              </div>
              <div className="form-row form-row-four">
                <TextField
                  hintText='150.00'
                  floatingLabelText="Price"
                  className="text-field inventory-add-text-field"
                  style={styles.smallPrice}
                  id="price-input"
                  value={this.state.priceInput}
                  onChange={this.handlePriceInputChange}
                  />
                <TextField
                  hintText='12.94'
                  floatingLabelText="Taxes"
                  className="text-field inventory-add-text-field"
                  style={styles.smallPrice}
                  id="taxes-input"
                  value={this.state.taxesInput}
                  onChange={this.handleTaxesInputChange}
                  />
                <TextField
                  hintText='10.00'
                  floatingLabelText="Shipping"
                  className="text-field inventory-add-text-field"
                  style={styles.smallPrice}
                  id="shipping-input"
                  value={this.state.shippingInput}
                  onChange={this.handleShippingInputChange}
                  />
                <TextField
                  hintText='29.00'
                  floatingLabelText="Customs"
                  className="text-field inventory-add-text-field"
                  style={styles.smallPrice}
                  id="customs-input"
                  value={this.state.customsInput}
                  onChange={this.handleCustomsInputChange}
                  />
              </div>
              <div className="form-row form-row-five">
                <TextField
                  hintText='201.94'
                  floatingLabelText="Total Cost"
                  className="text-field inventory-add-text-field"
                  id="total-cost-input"
                  value={this.state.totalCostInput}
                  onChange={this.handleTotalCostInputChange}
                  />
              </div>
            </div>
          </Tab>
          <Tab label="Image" value="b" style={styles.tabStyle}>
            <div className="inventory-add-image-tab">
              <div className="inventory-add-current-image">
                {this.handleImageView()}
              </div>
            </div>
          </Tab>
        </Tabs>
        <div className="form-row form-row-six-add">
          <div className="inventory-add-button-div">
            <RaisedButton label="Add" backgroundColor="#00bfa5" labelColor="white" fullWidth={true} onClick={this.addInventory}/>
          </div>
        </div>
      </div>
    )
  }
})

export default InventoryAdd;

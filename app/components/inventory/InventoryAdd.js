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
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import CircularProgress from 'material-ui/lib/circular-progress';
var noImg = require('../../images/no-image.png');
var checkImg = require('../../images/icon_check.png');

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
    background: '#009688',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0
  },
  gridList: {
    width: 380,
    overflowY: 'auto',
    marginBottom: 24,
    padding: 0
  },
  iconStyles: {
    marginRight: 24,
    color: 'black'
  },
  circularProgress: {
    margin: '40px 0'
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
      tabState: "a",
      loading: true,
      imageSearchRan: false,
      imageAjaxSuccess: false,
      imageAjaxReturn: [{link: ""}],
      imageAjaxReturnFixed: [{link: ""}],
      currentSelectedImage: "/images/no-image.png"
    }
  },
  imageSearch: function() {
    axios.get('https://www.googleapis.com/customsearch/v1?key=' + KEYS.GOOGLE_API_KEY + '&cx=' + KEYS.GOOGLE_CX + '&q=' + this.state.nameInput + '&searchType=image')
    .then(function(response) {
      console.log("response:", response);
      this.setState({
        imageSearchRan: true,
        imageAjaxSuccess: true,
        imageAjaxReturn: response.data.items,
        currentSelectedImage: response.data.items[0].link
      }, function() {
        //This will readjust the array to the Grid's input format
        var tempArray = [];
        for (var i = 0; i < this.state.imageAjaxReturn.length; i++) {
          var tempObject = {};
          tempObject.img = this.state.imageAjaxReturn[i].link;
          tempArray.push(tempObject);
        }
        this.setState({
          imageAjaxReturnFixed: tempArray
        })
      })
      }.bind(this))
      .catch(function(err){
        console.warn('Error:', err);
        return err;
      })
  },
  addInventory: function() {
    //This function runs the ajax request (CREATE) to add an item to the inventory
    axios.post('http://still-thicket-97625.herokuapp.com/items', {
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
      image_url: this.state.currentSelectedImage
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
        nameInput: document.getElementById('name-input').value,
        imageSearchRan: false,
        imageAjaxSuccess: false
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
    console.log('handle');
    if (this.state.imageSearchRan === false && this.state.tabState === "b") {
      //Run image search ajax request here
      this.imageSearch();
      return (
        <div className="inventory-add-image-tab" style={styles.circularProgress}>
          <CircularProgress className="circular-progress"/>
        </div>
      )
    } else {
      return (
        <p>Nothing to show here.</p>
      )
    }
  },
  handleNoImage: function(input) {
    if (input == "/images/no-image.png") {
      return noImg;
    } else {
      return input;
    }
  },
  handleImageView: function() {
    if (this.state.imageAjaxSuccess === true) {
      return (
        <div className="inventory-add-image-tab">
          <div className="inventory-add-current-image-div" >
            <img src={this.handleNoImage(this.state.currentSelectedImage)} className="inventory-add-current-image" />
            <img src={checkImg} className="icon-check" />
          </div>
          <div style={styles.root}>
            <GridList
              cellHeight={200}
              style={styles.gridList}
            >
              {this.state.imageAjaxReturnFixed.map(tile => (
                <GridTile
                  key={tile.img}
                  onClick={this.handleImageSelection}
                >
                  <img src={tile.img} />
                </GridTile>
              ))}
            </GridList>
          </div>
        </div>
      )
    } else if (this.state.nameInput == "" || this.state.nameInput == null || this.state.nameInput == undefined) {
      return (
        <div className="inventory-add-image-tab">
          <h2 className="no-product-entered-h2">Enter a product name before searching for an image.</h2>
        </div>
      )
    } else {
      return this.handleImageSearch();
    }
  },
  handleImageSelection: function(event) {
    this.setState({
      currentSelectedImage: event.target.src
    })
  },
  handleButtonView: function() {
    if (this.state.nameInput != "" && this.state.brandInput != "" && this.state.sizeInput != "" && this.state.colorInput != "" && this.state.priceInput != "" && this.state.totalCostInput != "") {
      return (
        <RaisedButton label="Add" backgroundColor="#00bfa5" labelColor="white" fullWidth={true} onClick={this.addInventory}/>
      )
    } else {
      return (
        <RaisedButton label="Add" backgroundColor="#00bfa5" labelColor="white" fullWidth={true} disabled={true} onClick={this.addInventory}/>
      )
    }
  },
  render: function() {
    return (
      <div className="inventory-add">
        <Tabs
        value={this.state.value}
        onChange={this.handleTabChange}
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
                {this.handleImageView()}
          </Tab>
        </Tabs>
        <div className="form-row form-row-six-add">
          <div className="inventory-add-button-div">
            {this.handleButtonView()}
          </div>
        </div>
      </div>
    )
  }
})

export default InventoryAdd;

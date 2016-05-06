import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import {Router, Route, Link, RouteHandler} from 'react-router';
import { hashHistory } from 'react-router'
import Dialog from 'material-ui/lib/dialog';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import CircularProgress from 'material-ui/lib/circular-progress';
import KEYS from '../../config/KEYS';

const styles = {
  colorField: {
    width: '100%'
  },
  smallPrice: {
    width: '90px'
  },
  floatingLabelStyle: {
    zIndex: 1,
    transform: 'perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)',
    transformOrigin: 'left top 0px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    color: 'rgba(0, 0, 0, 0.498039)',
    position: 'absolute',
    lineHeight: '22px',
    top: '38px',
    cursor: 'text',
    pointerEvents: 'none',
    WebkitUserSelect: 'none'
  },
  dialogDeleteButton: {
    color: '#d50000'
  },
  dialogCancelButton: {
    color: '#00bfa5'
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

const InventoryEdit = React.createClass({
  getInitialState: function() {
    return {
      dialogOpen: false,
      dialogActions: [
         <FlatButton
           label="Cancel"
           secondary={true}
           onTouchTap={this.closeDialog}
           labelStyle={styles.dialogCancelButton}
         />,
         <FlatButton
           label="Delete"
           primary={true}
           onTouchTap={this.deleteItem}
           labelStyle={styles.dialogDeleteButton}
         />,
      ],
      itemData: [],
      itemGetAjaxRan: false,
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
      imageSearchRan: false,
      imageAjaxSuccess: false,
      imageAjaxReturn: [{link: ""}],
      imageAjaxReturnFixed: [{link: ""}],
      checkImageUrl: "app/images/icon_check.png",
      tabState: "a",
      currentSelectedImage: "app/images/no-image.png"
    }
  },
  getItemData: function() {
    axios.get('http://localhost:3000/items/' + this.props.params.itemId)
    .then(function(response) {

      var nullToString = function(input) {
        if (input == null) {
          return "";
        } else {
          return parseFloat(input).toFixed(2);
        }
      };

      this.setState({
        itemData: response.data,
        itemGetAjaxRan: true,
        nameInput: response.data.name,
        brandInput: response.data.brand,
        sizeInput: response.data.size,
        colorInput: response.data.color,
        purchaseDateInput: response.data.purchase_date,
        purchasedFromInput: response.data.purchased_from,
        priceInput: nullToString(response.data.cost_price),
        taxesInput: nullToString(response.data.taxes),
        shippingInput: nullToString(response.data.shipping_cost),
        customsInput: nullToString(response.data.customs_fees),
        totalCostInput: nullToString(response.data.total_cost),
        currentSelectedImage: response.data.image_url
      }, function() {
        console.log("data saved:", this.state.itemData);
        document.getElementById('purchase-date-input').value = this.state.purchaseDateInput;
        console.log(this.props);

      })
    }.bind(this))
    .catch(function(err){
      console.warn('Error:', err);
      return err;
    })
  },
  componentWillMount: function() {
    this.getItemData();
  },
  addInventory: function() {
    //This function runs the ajax request (CREATE) to add an item to the inventory
    axios.put('http://localhost:3000/items/' + this.props.params.itemId, {
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
  deleteItem: function() {
    //This function runs the ajax request (CREATE) to add an item to the inventory
    axios.delete('http://localhost:3000/items/' + this.props.params.itemId)
    .then(function(response) {
      console.log("Item successfully deleted.");
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
  openDialog: function(event) {
    this.setState({
      dialogOpen: true,
    })
  },
  closeDialog: function() {
    this.setState({
      dialogOpen: false,
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
  handleImageView: function() {
    if (this.state.imageAjaxSuccess === true) {
      return (
        <div className="inventory-add-image-tab">
          <div className="inventory-add-current-image-div" >
            <img src={this.state.currentSelectedImage} className="inventory-add-current-image" />
            <img src={this.state.checkImageUrl} className="icon-check" />
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
  imageSearch: function() {
    axios.get('https://www.googleapis.com/customsearch/v1?key=' + KEYS.GOOGLE_API_KEY + '&cx=' + KEYS.GOOGLE_CX + '&q=' + this.state.nameInput + '&searchType=image')
    .then(function(response) {
      console.log("response:", response);
      this.setState({
        imageSearchRan: true,
        imageAjaxSuccess: true,
        imageAjaxReturn: response.data.items,
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
  render: function() {
    return (
      <div className="inventory-edit">
        <Tabs
        value={this.state.value}
        onChange={this.handleTabChange}
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.tabsStyle}
        tabItemContainerStyle={styles.tabItemContainer}
      >
          <Tab label="Info" value="a" style={styles.tabStyle}>
            <div className="inventory-edit-info-tab">
              <div className="form-row form-row-one">
                <TextField
                  hintText='Air Jordan 6 "Infrared" (2010)'
                  floatingLabelText="Name"
                  className="text-field inventory-add-text-field"
                  id="name-input"
                  value={this.state.nameInput}
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
                  hintText='Purchase Date'
                  floatingLabelText="Purchase Date"
                  floatingLabelStyle={styles.floatingLabelStyle}
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
        <div className="form-row form-row-six-edit">
          <div className="inventory-update-button-div">
            <RaisedButton label="Update" backgroundColor="#00bfa5" labelColor="white" fullWidth={true} onClick={this.addInventory}/>
          </div>
          <div className="inventory-delete-button-div">
            <RaisedButton label="Delete" backgroundColor="white" labelColor="#d50000" fullWidth={true} onClick={this.openDialog}/>
            <Dialog
            title="Delete"
            actions={this.state.dialogActions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.closeDialog}
          >
            Are you sure you want to delete this item?
          </Dialog>

          </div>
        </div>
      </div>
    )
  }
})

export default InventoryEdit;

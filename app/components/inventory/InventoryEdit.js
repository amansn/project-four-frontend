import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import {Router, Route, Link, RouteHandler} from 'react-router';
import { hashHistory } from 'react-router'
import Dialog from 'material-ui/lib/dialog';

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
      imageUrl: "",
      tabState: "a"
    }
  },
  getItemData: function() {
    axios.get('http://localhost:3000/items/' + this.props.params.itemId)
    .then(function(response) {
      this.setState({
        itemData: response.data,
        itemGetAjaxRan: true,
        nameInput: response.data.name,
        brandInput: response.data.brand,
        sizeInput: response.data.size,
        colorInput: response.data.color,
        purchaseDateInput: "5/10/2016",
        purchasedFromInput: response.data.purchased_from,
        priceInput: parseFloat(response.data.cost_price).toFixed(2),
        taxesInput: parseFloat(response.data.taxes).toFixed(2),
        shippingInput: parseFloat(response.data.shipping_cost).toFixed(2),
        customsInput: parseFloat(response.data.customs_fees).toFixed(2),
        totalCostInput: parseFloat(response.data.total_cost).toFixed(2),
        imageUrl: response.data.image_url
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
  render: function() {
    return (
      <div className="inventory-add">
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

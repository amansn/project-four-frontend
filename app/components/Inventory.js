import React from 'react';
import axios from 'axios';
const {Grid, Row, Col} = require('react-flexbox-grid');
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
var noImg = require('../images/no-image.png');
import { Link } from 'react-router';

const styles = {
  button: {
    margin: '0px 5px'
  },
  cardText: {
    padding: '16px 16px 0px 16px'
  },
  cardHeader: {
    height: 'auto',
    margin: '16px 16px 16px 16px',
    padding: '0px'
  },
  addButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 2
  }
};

const Inventory = React.createClass({
  getInitialState: function() {
    return {
      inventoryAjaxRan: false,
      inventoryExists: false,
      inventoryData: [
        {
          brand: "",
          color: "",
          cost_price: "",
          created_at: "",
          customs_fees: "",
          id: 0,
          image_url: "",
          name: "",
          purchase_date: "",
          purchased_from: "",
          shipping_cost: "",
          size: "",
          taxes: "",
          total_cost: "",
          updated_at: ""
        }
      ]
    }
  },
  getInventoryData: function() {
    axios.get('http://still-thicket-97625.herokuapp.com/items')
    .then(function(response) {
      this.setState({
        inventoryData: response.data,
        inventoryExists: true,
        inventoryAjaxRan: true
      }, function() {
        console.log("data saved:", this.state.inventoryData);
      })
    }.bind(this))
    .catch(function(err){
      console.warn('Error:', err);
      return err;
    })
  },
  componentWillMount: function() {
    this.getInventoryData();
  },
  componentViewSelector: function() {
    //This function displays the proper inventory component.
    //If there are no inventory results (or the ajax call hasn't completed) it will provde a message.
    if (this.state.inventoryAjaxRan === true) {
      if (this.state.inventoryExists === false) {
        return (
        <h2 className="no-results-message">Nothing here. Go cop something.</h2>
        )
      }
      else {
        return (
          <div className="inventory">
            {this.cardBuilder()}
          </div>
        )
      }
    }
  },
  handleNoImage: function(input) {
    if (input == "/images/no-image.png") {
      return noImg;
    } else {
      return input;
    }
  },
  cardBuilder: function() {
    //This function builds out the cards based on the data returned from the ajax request
    const cardsVar = [];
    for (var i = 0; i < this.state.inventoryData.length; i++) {
       cardsVar.push(
        <Card className="card" key={i}>
          <CardHeader
            title={this.state.inventoryData[i].name}
            subtitle={this.state.inventoryData[i].brand}
            style={styles.cardHeader}
          />
          <CardMedia>
            <img src={this.handleNoImage(this.state.inventoryData[i].image_url)} />
          </CardMedia>
          <CardText className="card-text" style={styles.cardText}>
            <div className="card-text-div">Size<br /><span className="card-text-size-text">{this.state.inventoryData[i].size}</span></div>
            <div className="vertical-hr">&nbsp;</div>
            <div className="card-text-div">Color<br /><span className="card-text-color-text">{this.state.inventoryData[i].color}</span></div>
          </CardText>
          <CardActions className="card-actions">
            <Link to={'/inventory/edit/' + this.state.inventoryData[i].id}><FlatButton label="Edit" style={styles.button} /></Link>
            <FlatButton label="Sell" style={styles.button} />
          </CardActions>
        </Card>
      )
    }
    return cardsVar;
  },
  render: function() {
    return (
      <div className="inventory-container">
          {this.componentViewSelector()}
          <Link to={'/inventory/add'}>
            <FloatingActionButton backgroundColor="#00bfa5" style={styles.addButton}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
      </div>
    )
  }
});

export default Inventory;

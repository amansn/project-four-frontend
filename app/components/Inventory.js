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
    axios.get('http://localhost:3000/items')
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
            <img src={this.state.inventoryData[i].image_url} />
          </CardMedia>
          <CardText className="card-text" style={styles.cardText}>
            <div className="card-text-div">Size<br /><span className="card-text-size-text">{this.state.inventoryData[i].size}</span></div>
            <div className="vertical-hr">&nbsp;</div>
            <div className="card-text-div">Color<br /><span className="card-text-color-text">{this.state.inventoryData[i].color}</span></div>
          </CardText>
          <CardActions className="card-actions">
            <FlatButton label="Edit" style={styles.button} />
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
        <h1>Inventory</h1>
          {this.componentViewSelector()}
      </div>
    )
  }
});

export default Inventory;

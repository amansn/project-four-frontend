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
  }
};

const Inventory = React.createClass({
  getInitialState: function() {
    return {
      inventoryData: []
    }
  },
  getInventoryData: function() {
    axios.get('http://localhost:3000/items')
    .then(function(response) {
      this.setState({
        inventoryData: response.data
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
  render: function() {
    return (
      <div className="inventory-container">
        <h1>Inventory</h1>
        <div className="inventory">
          <Row>
            <Col xs={12} sm={6} md={4} lg={3} className="col1">
              <Card className="card">
                <CardHeader
                  title={this.state.inventoryData[1].name}
                  subtitle={this.state.inventoryData[1].brand}
                />
              <CardMedia>
                <img src={this.state.inventoryData[1].image_url} />
              </CardMedia>
                <CardText className="card-text">
                  <div className="card-text-div">Size<br /><span className="card-text-size-text">{this.state.inventoryData[1].size}</span></div>
                  <div className="card-text-div card-text-color-div">Color<br /><span className="card-text-color-text">{this.state.inventoryData[1].color}</span></div>
                </CardText>
                <CardActions className="card-actions">
                  <FlatButton label="Edit" style={styles.button} />
                  <FlatButton label="Sell" style={styles.button} />
                </CardActions>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="col1">
              <Card className="card">
                <CardHeader
                  title={this.state.inventoryData[0].name}
                  subtitle={this.state.inventoryData[0].brand}
                />
              <CardMedia>
                  <img src="https://content.nike.com/content/dam/one-nike/en_us/season-2015-ho/SHOP/Launch/air-jordan-8-retro-aqua/Air-Jordan-8-Retro-Aqua-Medial.jpeg.transform/default/image.jpg" />
                </CardMedia>
                <CardText className="card-text">
                  <div className="card-text-div">Size<br /><span className="card-text-size-text">9</span></div>
                  <div className="card-text-div">Color<br /><span className="card-text-color-text">{this.state.inventoryData[0].color}</span></div>
                </CardText>
                <CardActions className="card-actions">
                  <FlatButton label="Edit" style={styles.button} />
                  <FlatButton label="Sell" style={styles.button} />
                </CardActions>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="col1">
              <Card className="card">
                <CardHeader
                  title={this.state.inventoryData[0].name}
                  subtitle={this.state.inventoryData[0].brand}
                />
              <CardMedia>
                  <img src="https://content.nike.com/content/dam/one-nike/en_us/season-2015-ho/SHOP/Launch/air-jordan-8-retro-aqua/Air-Jordan-8-Retro-Aqua-Medial.jpeg.transform/default/image.jpg" />
                </CardMedia>
                <CardText className="card-text">
                  <div className="card-text-div">
                    <span>Size</span>
                    <p className="card-text-size-text">13.5</p>
                  </div>
                  <div className="card-text-div">
                    <span>Color</span>
                    <p className="card-text-color-text">{this.state.inventoryData[0].color}</p>
                  </div>
                </CardText>
                <CardActions className="card-actions">
                  <FlatButton label="Edit" style={styles.button} />
                  <FlatButton label="Sell" style={styles.button} />
                </CardActions>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="col1">
              <Card className="card">
                <CardHeader
                  title={this.state.inventoryData[0].name}
                  subtitle={this.state.inventoryData[0].brand}
                />
              <CardMedia>
                <img src="https://content.nike.com/content/dam/one-nike/en_us/season-2015-ho/SHOP/Launch/air-jordan-8-retro-aqua/Air-Jordan-8-Retro-Aqua-Medial.jpeg.transform/default/image.jpg" />
              </CardMedia>
              <CardText className="card-text">
                <div className="card-text-div">Size<br /><span className="card-text-size-text">9</span></div>
                <div className="vertical-hr">&nbsp;</div>
                <div className="card-text-div">Color<br /><span className="card-text-color-text">{this.state.inventoryData[0].color}</span></div>
              </CardText>
              <CardActions className="card-actions">
                <FlatButton label="Edit" style={styles.button} />
                <FlatButton label="Sell" style={styles.button} />
              </CardActions>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
});

export default Inventory;

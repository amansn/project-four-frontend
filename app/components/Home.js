import React from 'react';
import {Link} from 'react-router'
import Divider from 'material-ui/lib/divider';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  mainButton: {
    marginTop: 40
  }
}

const Home = React.createClass({
  render: function() {
    return (
      <div className="home-container">
        <div className="row home-row-one">
          <h1 className="main-heading">Organize your hustle.</h1>
          <h2 className="main-subheading">Simple inventory tracking for sneakerheads.</h2>
          <Link to='/inventory/add'><RaisedButton label="Get started" style={styles.mainButton} /></Link>
        </div>
      </div>
    )
  }
});

export default Home;

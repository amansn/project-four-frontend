import React from 'react';
var css = require("../styles/style.css");
var reactGridOne = require("../../node_modules/react-grid-layout/css/styles.css");
var reactGridTwo = require("../../node_modules/react-resizable/css/styles.css");
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';
import {Link} from 'react-router';

const styles = {
  title: {
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none'
  },
  reset: {
    margin: '0px',
    padding: '0px'
  },
  appBar: {
    backgroundColor: '#00bfa5',
    marginBottom: '20px'
  }
};

const Main = React.createClass({
  render: function() {
    return(
      <div className="main-container">
        <AppBar
  title={<Link to='/' style={styles.title}>COPP'D</Link>}
  showMenuIconButton={false}
  style={styles.appBar}
  iconElementRight={<Link to='/inventory' style={styles.reset}><FlatButton label="Inventory" /></Link>}
/>
        {this.props.children}
      </div>
    )
  }
});

export default Main;

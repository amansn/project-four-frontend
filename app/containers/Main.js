import React from 'react';
var css = require("../styles/style.css");
var reactGridOne = require("../../node_modules/react-grid-layout/css/styles.css");
var reactGridTwo = require("../../node_modules/react-resizable/css/styles.css");
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';
import {Link} from 'react-router';
var Breadcrumbs = require('react-breadcrumbs');
import Popover from 'material-ui/lib/popover/popover';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import CustomTheme from '../config/CustomTheme';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

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
  },
  inventoryButton: {
    color: 'white'
  }
};

const Main = React.createClass({
  getInitialState: function() {
    return {
      currentPage: "Home"
    }
  },
  getLastRoute: function() {
    var routeArray = [];
    if (this.props.routes.length < 3) {
      return [];
    }
    if (this.props.routes[this.props.routes.length - 1].name == undefined || this.props.routes[this.props.routes.length - 1].name == null || this.props.routes[this.props.routes.length - 1].name == false) {
      routeArray.push(this.props.routes[this.props.routes.length - 2]);
    } else {
      routeArray.push(this.props.routes[this.props.routes.length - 1]);
    }
    return routeArray;
  },
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(CustomTheme),
    };
  },
  render: function() {
    return(
      <div className="main-container">
        <AppBar
  showMenuIconButton={false}
  style={styles.appBar}>
    <div id="nav">
      <div id="app-bar-left">
        <Link to='/' style={styles.title} className="coppd-title"><img src="/images/coppd-logo.png" className="coppd-logo-img"/></Link>
          <Breadcrumbs
                    routes={this.getLastRoute()}
                  />
          </div>
      <div id="app-bar-right">
        <Link to='/inventory' style={styles.reset}><FlatButton label="Inventory" labelStyle={styles.inventoryButton}/></Link>
      </div>
    </div>
  </AppBar>
        {this.props.children}
      </div>
    )
  }
});

export default Main;

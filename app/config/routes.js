import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Main from '../containers/Main';
import Home from '../components/Home';
import Inventory from '../components/Inventory';

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='inventory' component={Inventory} />
    </Route>
  </Router>
);

export default routes;

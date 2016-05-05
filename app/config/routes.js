import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Main from '../containers/Main';
import Home from '../components/Home';
import Inventory from '../components/Inventory';
import InventoryAdd from '../components/inventory/InventoryAdd';
import InventoryEdit from '../components/inventory/InventoryEdit';

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main} name='Home'>
      <IndexRoute component={Home} />
      <Route path='inventory' name='Inventory'>
        <IndexRoute component={Inventory} />
        <Route path='add' component={InventoryAdd} name='Add'/>
        <Route path='edit' component={InventoryEdit} name='Edit'>
          <Route path=':itemId' component={InventoryEdit} name='Edit' />
        </Route>
      </Route>
    </Route>
  </Router>
);

export default routes;

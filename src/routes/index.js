import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Partners from '../pages/Partners';

import SalesFormPage from '../pages/SalesFormPage';
import ProductsFormPage from '../pages/ProductsFormPage';
import PartnersFormPage from '../pages/PartnersFormPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/partners" component={Partners} />
    <Route exact path="/sales/add" component={SalesFormPage} />
    <Route exact path="/products/add" component={ProductsFormPage} />
    <Route exact path="/partners/add" component={PartnersFormPage} />
  </Switch>
);

export default Routes;
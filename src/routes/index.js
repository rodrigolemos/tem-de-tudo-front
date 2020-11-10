import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Partners from '../pages/Partners';

import SalesFormPage from '../pages/SalesFormPage';
import ProductsFormPage from '../pages/ProductsFormPage';
import PartnersFormPage from '../pages/PartnersFormPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/products" component={Products} />
    <Route path="/partners" component={Partners} />
    <Route path="/sales/add" component={SalesFormPage} />
    <Route path="/product/:id?" component={ProductsFormPage} />
    <Route path="/partner/:id?" component={PartnersFormPage} />
  </Switch>
);

export default Routes;

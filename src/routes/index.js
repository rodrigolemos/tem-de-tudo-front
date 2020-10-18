import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Partners from '../pages/Partners';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/partners" component={Partners} />
  </Switch>
);

export default Routes;
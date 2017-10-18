import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Home from './views/Home/Index';
import NotFound from './views/Error/NotFound';
import Login from './views/Usuario/Login';

//import FetchData from './components/FetchData';
//import Counter from './components/Counter';


export const routes = <Layout>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route component={NotFound} />
    </Switch>
</Layout>;

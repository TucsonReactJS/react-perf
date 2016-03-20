import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route , Link,hashHistory } from 'react-router';
import App from './components/app';
import ShouldComponentUpdate from './components/should_component_update/master';
import Perf from 'react-addons-perf';


window.Perf = Perf;


/*
 Routes
 */
var routes = (
<Router history={hashHistory}>
    <Route path="/" component={App}>
        <Route path="/scu" component={ShouldComponentUpdate}/>
    </Route>
</Router>
);

ReactDOM.render(routes, document.querySelector('#app'));

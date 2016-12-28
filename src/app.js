import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import {browserHistory, Router, Route} from 'react-router';

import Root from './components/root.jsx';

ReactGA.initialize('UA-79506537-1');
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/personal-timeline/" component={Root}></Route>
    <Route path="/" component={Root}></Route>
  </Router>
),  document.getElementById('app'));

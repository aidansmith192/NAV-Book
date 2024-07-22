import React from 'react';
import LoginPage from './Login';
import RegisterPage from './Register';
import NotFound from './NotFound';
import AuthProvider from '../contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Listing from './Listing';
import Home from './Home';
import Post from './Post';


/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/post" component={Post} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;

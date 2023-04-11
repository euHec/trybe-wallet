import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={ Login } path="/" />
        <Route exact component={ Wallet } path="/carteira" />
      </Switch>
    );
  }
}

export default App;

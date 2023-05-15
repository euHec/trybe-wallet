import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './AppDesktop.css';
import './AppMobile.css';
import './AppTablet.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={ Login } path="/trybe-wallet" />
        <Route exact component={ Wallet } path="/trybe-wallet/carteira" />
      </Switch>
    );
  }
}

export default App;

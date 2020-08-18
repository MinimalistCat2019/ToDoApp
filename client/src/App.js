import React, {Component} from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './Components/Register';
import Todos from './Components/Todos';
import Admin from './Components/Admin';
import PrivateRoute from './hocs/PrivateRoute';
import PublicRoute from './hocs/PublicRoute';


class App extends Component {
  state = {
    navbarOpen: false
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen});
  }

  render () {
    return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div>
          <Router>

            <Header />
            <Route exact path="/" component={Home} />
            <PublicRoute path='/login' component={Login} />
            <PublicRoute path='/register' component={Register} />
            <PrivateRoute path='/todos' component={Todos} roles={["user", "admin"]}/>
            <PrivateRoute path='/admin' component={Admin} roles={["admin"]}/>
          </Router>
        </div>
      </>
  </ThemeProvider>
    )
  };
}

export default App;

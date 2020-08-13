import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './Components/Register';
import Todos from './Components/Todos';
import Admin from './Components/Admin';
import PrivateRoute from './hocs/PrivateRoute';
import PublicRoute from './hocs/PublicRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home}/>
      <PublicRoute path='/login' component={Login} />
      <PublicRoute path='/register' component={Register} />
      <PrivateRoute path='/todos' component={Todos} roles={["user", "admin"]}/>
      <PrivateRoute path='/admin' component={Admin} roles={["admin"]}/>
    </Router>
  );
}

export default App;

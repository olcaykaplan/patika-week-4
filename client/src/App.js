import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
import Users from './Pages/Users';
import Layout from './Components/Layout';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomePage />
          </Layout>
        </Route>
        <Route path="/users" exact>
          <Layout>
            <Users />
          </Layout>
        </Route>
        <Route path="/signup">
          <Login isFormSignIn={false} />
        </Route>
        <Route path="/signin">
          <Login isFormSignIn={true} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

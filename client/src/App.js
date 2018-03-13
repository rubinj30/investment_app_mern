import React, { Component } from "react"
import { Router, Route, Switch } from "react-router-dom"
import InvestmentList from "./components/InvestmentList"
import SingleInvestmentPage from "./components/SingleInvestmentPage"
import UserProfile from "./components/UserProfile"
import LogIn from "./components/LogIn"
import UserList from './components/UserList'
import Auth from './Auth/Auth';
import history from './Auth/History';
import CallbackComponent from './components/CallbackComponent'
import "./App.css";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>

            <Route exact path="/" component={UserList} />
            <Route exact path="/login" render={(props) =>  <LogIn auth={auth} /> } />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/users/:id" component={UserProfile} />
            <Route exact path="/users/:id/investments" component={InvestmentList} />
            <Route exact path="/users/:userId/investments/:investmentId" component={SingleInvestmentPage} />
          </Switch>
          <Route exact path="/callback" render={(props) => {
            handleAuthentication(props);
            return <CallbackComponent {...props} />
          }} />
        </div>
      </Router>
    )
  }
}


export default App
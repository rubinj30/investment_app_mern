import React, {Component} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import HomePage from "./components/HomePage"
import InvestmentList from "./components/InvestmentList"
import SingleInvestmentPage from "./components/SingleInvestmentPage"
import UserProfile from "./components/UserProfile"
import "./App.css";

class App extends Component {
    render() {
      return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/users" component={HomePage}/>
              <Route exact path="/users/:id" component={UserProfile}/>
              <Route exact path="/users/:id/investments" component={InvestmentList}/>
              <Route exact path="/users/:userId/investments/:investmentId" component={SingleInvestmentPage}/>
            </Switch>
          </div>
        </Router>
        )
    }
}

export default App
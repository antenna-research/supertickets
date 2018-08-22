import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'
import EventsList from './components/events/EventsList'
import TicketsList from './components/events/TicketsList'
import TicketDetail from './components/events/TicketDetail'
import AddEventForm from './components/events/AddEventForm'
import './App.css'
import TopBar from './components/layout/TopBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{marginTop:75}}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventsList} />
            <Switch>
              <Route exact path="/event/add" component={AddEventForm} />
              <Route exact path="/event/:id" component={TicketsList} />
            </Switch>
            <Route exact path="/ticket/:id" component={TicketDetail} />
            <Route exact path="/" render={ () => <Redirect to="/events" /> } />
          </main>
        </div>
      </Router>
    )
  }
}
export default App

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/scss/global.scss';

import { Home } from './views/home';
import { ContactPage } from './views/ContactPage';
import { StatisticPage } from './views/StatisticPage';
import { Header } from './cmps/Header';
import { Component } from 'react'
import { ContactDetails } from './views/ContactDetails';
import { EditContact } from './views/EditContact';
import { SignupPage } from './views/SignupPage';

export class App extends Component {

  render() {
    return (
      <Router>
        <section className="App">
          <div>
            <Header></Header>
            <Switch>
              <Route path="/contact/edit/:id" component={EditContact}></Route>
              <Route path="/contact/edit" component={EditContact}></Route>
              <Route path="/contact/:id" component={ContactDetails}></Route>
              <Route path="/signup" component={SignupPage}></Route>
              <Route path="/contact" component={ContactPage}></Route>
              <Route path="/stats" component={StatisticPage}></Route>
              <Route path="/" component={Home}></Route>
            </Switch>
          </div> 
        </section>
      </Router>
    )
  }
}


export default App;

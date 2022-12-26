import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/scss/global.scss';

import { Home } from './views/home';
import { ContactPage } from './views/ContactPage';
import { StatisticPage } from './views/StatisticPage';
import { Header } from './cmps/Header';
import { Component } from 'react'
import { ContactDetails } from './views/ContactDetails';
import { EditContact } from './views/EditContact';

export class App extends Component {
  render() {
    return (
      <Router>
        <section className="App">
          <Header></Header>
          <Switch>
            <Route path="/contact/edit/:id" component={EditContact}></Route>
            <Route path="/contact/edit" component={EditContact}></Route>
            <Route path="/contact/:id" component={ContactDetails}></Route>
            <Route path="/contact" component={ContactPage}></Route>
            <Route path="/stats" component={StatisticPage}></Route>
            <Route path="/" component={Home} ></Route>
          </Switch>
        </section>
      </Router>
    )
  }
}

export default App;

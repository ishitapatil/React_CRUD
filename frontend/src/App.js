import './App.css';
import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PersonList from './PersonList';
import PersonEdit from "./PersonEdit";

class App extends Component {
  state = {
    people: []
  };

  async componentDidMount() {
    const response = await fetch('/v1/people');
    const body = await response.json();
    this.setState({people: body});
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/v1/people' exact={true} component={PersonList}/>
          <Route path='/v1/people:id' component={PersonEdit}/>
        </Switch>
      </Router>
  );
  }
}
export default App;
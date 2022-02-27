import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY


  state={
    progress:0
  }
  setProgress=(progress)=>{
      this.setState({progress:progress})
  }
  render() {
    return (
      <Router>
      <div>
      <Navbar/>
      <LoadingBar height={6} color='#f11946' progress={this.state.progress}/>
      <Switch>
        <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} key="general" country="in" category="general"/></Route>
        <Route path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} key="business" country="in" category="business"/></Route>
        <Route path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} key="entertainment" country="in" category="entertainment"/></Route>
        <Route path="/general"><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} key="general" country="in" category="general"/></Route>
        <Route path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} key="health" country="in" category="health"/></Route>
        <Route path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} key="science" country="in" category="science"/></Route>
        <Route path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} key="sports" country="in" category="sports"/></Route>
        <Route path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={6} key="technology" country="in" category="technology"/></Route>

      </Switch>
      </div> 
    </Router>
    )
  }
}

export default App


// using class Basee componenet 
import React, { Component } from 'react';
import { Navbar } from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';


export default class App extends Component{ 
  // let {pageSize} = this.this.props ; 
  render(){
    return(
      <div>
        <Router>
        <Navbar />
          <Routes>
          <Route exact path="/"  element={<News pageSize={6} key="genel" country="in" category="general" />}  />
          <Route exact path="/entertainment"   element={<News pageSize={6} key="entertainmetn" country="in" category="entertainment" />}  />
          <Route exact path="/general"  element={<News pageSize={6}  country="in" key="general" category="general" />}  />
          <Route exact path="/health"  element={<News pageSize={6}  country="in" key="halth" category="health" />}  />
          <Route exact path="/science"  element={<News pageSize={6}  country="in" key="sciend" category="science" />}  />
          <Route exact path="/business" element={<News pageSize={6}  country="in" key="niising" category="business" />}  />
        </Routes>
        </Router>
      </div>
    )
  }
}
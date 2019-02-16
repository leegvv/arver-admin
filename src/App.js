import React, { Component } from 'react';
import './App.less';
import BasicLayout from './layouts/BasicLayout';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <BasicLayout/>
        </BrowserRouter>
    );
  }
}

export default App;

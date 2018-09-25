import React, { Component } from 'react';
import './App.css';
import Form from './containers/Form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Currency Converter</h1>
        </header>
        <div className="App-intro">
          <Form />
        </div>
      </div>
    );
  }
}

export default App;

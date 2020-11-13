import React, { Component } from 'react';
import './App.css';
import Content from './Components/Content/Content';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header'
class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <header className="Header">
          <Header />
        </header>
        <div className="content">
          <Content />
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './test.css';
import ava from './assets/ava.jpg';
class test extends Component {
  render() {
    return (
<div className="grid-container">
  <div className="item1">Header</div>
  <div className="item2">Menu</div>
  <div className="item3">Main</div>  
  <div className="item4">Right</div>
  <div className="item5">Footer</div>
</div>
    );
  }

}

export default test;

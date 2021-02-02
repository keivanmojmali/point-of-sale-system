import React from 'react';


export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

  };
  render() {
    //ADD THE BOOTSTRAP STYLING AND THE EXTRA STLYING THAT YOU WANT
    //THIS IS BUILT WE REG BOOTSTRAP NAV

    <nav className="navbar bg-light navbar-light d-flex">
      <a href="#pos" className="navbar-brand">
        <i className="fas fa-mug-hot"></i>
      </a>
      <a href="#order">
        <i className='fas fa-shopping-cart'></i>
      </a>
      <a href="#inventory" onClick={this.handleClick}>
        <i className='fas fa-inventory'></i>
      </a>
    </nav>
  }
}

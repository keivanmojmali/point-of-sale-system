import React from 'react';


export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

  };
  render() {
    //ADD THE BOOTSTRAP STYLING AND THE EXTRA STLYING THAT YOU WANT
    //THIS IS BUILT WE REG BOOTSTRAP NAV

    return(
      <nav className="navbar align-items-center justify-content-around bg-light navbar-light d-flex w-100">
        <a href="#pos" className="navbar-brand d-flex center-all">
          <i className="icon-size fas fa-mug-hot"></i>
        </a>
        <a href="#cart" className="navbar-brand d-flex center-all">
          <i className='icon-size fas fa-shopping-cart'></i>
        </a>
        <a href="#orders" className="navbar-brand d-flex center-all">
          <i className='icon-size fas fa-box-open'></i>
        </a>
        <a href="#inventory" className="navbar-brand d-flex center-all">
          <i className='icon-size fas fa-dolly-flatbed'></i>
        </a>
      </nav>
    )

  }
}

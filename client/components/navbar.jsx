import React from 'react';


export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.itemsInCart = this.itemsInCart.bind(this)
  };
  itemsInCart(){

    if(this.props.itemsInCart > 0 ){
      return <div className='d-flex justify-content-center align-items-center items-in-cart'>
        {this.props.itemsInCart}
      </div>
    }
  };
  render() {
    //ADD THE BOOTSTRAP STYLING AND THE EXTRA STLYING THAT YOU WANT
    //THIS IS BUILT WE REG BOOTSTRAP NAV
    console.log('HHHHHHH',this.props.itemsInCart)
    return(
      <nav className="navbar align-items-center justify-content-around bg-light navbar-light d-flex w-100">
        <a href="#pos" className="navbar-brand d-flex center-all">
          <i className="icon-size fas fa-mug-hot"></i>
        </a>
        <a href="#cart" className="navbar-brand d-flex center-all">
          <i className='icon-size fas fa-shopping-cart'></i>
          {this.itemsInCart()}
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

import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.itemsInCart = this.itemsInCart.bind(this);
  }

  itemsInCart() {
    if (this.props.itemsInCart > 0) {
      return <div className='d-flex justify-content-center align-items-center items-in-cart'>
        {this.props.itemsInCart}
      </div>;
    }
  }

  render() {
    return (
      <nav className="border-top border-dark navbar align-items-center justify-content-around bg-light navbar-light d-flex w-100">
        <a href="#pos" className="text-center navbar-brand d-flex flex-column red">
          <i className="icon-size fas fa-mug-hot"></i>
          <h6 className='red'>Browse</h6>
        </a>
        <a href="#cart" className="text-center navbar-brand d-flex flex-column red">
          <div className="navbar-brand d-flex m-0">
            <i className='icon-size fas fa-shopping-cart'></i>
            {this.itemsInCart()}
          </div>
          <h6 className='red'>Cart</h6>
        </a>
        <a href="#orders" className="text-center navbar-brand d-flex flex-column red">
          <i className='icon-size fas fa-box-open'></i>
          <h6 className='red'>Open-Orders</h6>
        </a>
        <a href="#inventory" className="text-center navbar-brand d-flex flex-column red">
          <i className='icon-size fas fa-dolly-flatbed'></i>
          <h6 className='red'>Inventory</h6>
        </a>
      </nav>
    );
  }
}

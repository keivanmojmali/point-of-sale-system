import React from 'react';
import Navbar from '../components/navbar';
import Inventory from './inventory';
import TestOrdersPage from './TestOrderPage';
import Cart from './cart';
import parseRoute from '../../server/parseRoute';
import Orders from './orders';
const root = document.querySelector('#root');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      cartAmount: null
    };
    this.renderPage = this.renderPage.bind(this);
    this.setCartAmount = this.setCartAmount.bind(this);
  }

  componentDidMount() {
    const itemCount = JSON.parse(localStorage.getItem('itemsInCart'));
    this.setCartAmount(itemCount);
    window.addEventListener('resize', () => {
      root.style = `height: ${window.innerHeight}px`;
    });
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    fetch('/api/orderItems/orderId')
      .then(result => {
        return result.json();
      })
      .then(data => {
        const newOrderId = data[0].max + 1;
        localStorage.setItem('currentId', JSON.stringify(newOrderId));

      }).catch(err => {
        console.error(err);
      });

    switch (this.state.route.path) {
      case 'cart':
        return <Cart setCartAmount={this.setCartAmount} />;
      case 'pos':
        return <TestOrdersPage setCartAmount={this.setCartAmount} />;
      case 'inventory':
        return <Inventory />;
      case 'orders':
        return <Orders />;
      case '':
        return <TestOrdersPage setCartAmount={this.setCartAmount} />;
    }
  }

  setCartAmount(cartAmount) {
    this.setState({ cartAmount });
  }

  render() {
    root.style = `height: ${window.innerHeight}px`;
    return (
      <div className="container-fluid h-100 d-flex flex-column justify-content-between">
        <div className="row h-100 overflow-auto">
            {this.renderPage()}
        </div>
        <div className="row">
            <div className="col p-0">
            <Navbar itemsInCart={this.state.cartAmount} />
            </div>
        </div>
      </div>
    );
  }
}

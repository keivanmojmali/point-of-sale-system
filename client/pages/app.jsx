import React from 'react';
import Navbar from '../components/navbar';
import Inventory from './inventory';
import TestOrdersPage from './TestOrderPage';
import Cart from './cart';
import parseRoute from '../../server/parseRoute';
import Orders from './orders';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      cartAmount: null
    };
    this.renderPage = this.renderPage.bind(this);
    this.setCartAmount = this.setCartAmount.bind(this)
  };
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      })
    });
  };
  renderPage() {
    fetch('/api/orderItems/orderId')
      .then(result => {
        return result.json()
      })
      .then(data => {
        let newOrderId = data[0].max + 1;
        localStorage.setItem('currentId', JSON.stringify(newOrderId));

      }).catch(err => {
        console.error(err)
      })
    switch(this.state.route.path){
      case 'cart':
        return <Cart setCartAmount={this.setCartAmount} />;
        break;
      case 'pos':
        return <TestOrdersPage setCartAmount={this.setCartAmount} />;
        break;
      case 'inventory':
        return <Inventory />;
        break;
        case 'orders':
          return <Orders />
          break;
      case '':
        return <TestOrdersPage setCartAmount={this.setCartAmount} />
        break;
    }
  };
  setCartAmount(cartAmount) {
    this.setState({ cartAmount });
  }
  render() {
    return (
      <div className="container-fluid h-100 d-flex flex-column">
        <div className="row h-100">
            {this.renderPage()}
        </div>
        <div className="row">
            <div className="col p-0 align-self-end">
            <Navbar itemsInCart={this.state.cartAmount} />
            </div>
        </div>
      </div>
    )
  }
}

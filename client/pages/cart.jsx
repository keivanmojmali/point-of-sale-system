import React from 'react';
import ItemizedCart from '../components/itemizedCart';
import Payment from '../components/payment';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      currentOrderArray: null,
      checkout: false,
      removedIds: []
    };
    this.queryOrder = this.queryOrder.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  queryOrder() {
    const localStorageId = JSON.parse(localStorage.getItem('currentId'));
    fetch(`/api/currentOrder/${localStorageId}`)
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ currentOrderArray: data });
        const reducerMethod = (accumulator, currentValue) => {
          return accumulator + currentValue.price;
        };
        const total = this.state.currentOrderArray.reduce(reducerMethod, 0);
        if (!Number.isInteger(total) || total < 0) {
          this.setState({ total: 0 });
        } else {
          this.setState({ total });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.queryOrder();
  }

  handleCheckout() {
    this.setState({ checkout: true });
  }

  handleRemove(orderItemsId) {
    const checkForRemoved = [...this.state.removedIds];
    if (checkForRemoved.includes(orderItemsId)) {
      return;
    }
    checkForRemoved.push(orderItemsId);
    this.setState({ removedIds: checkForRemoved });
    const items = JSON.parse(localStorage.getItem('itemsInCart')) - 1;
    const newNum = JSON.stringify(items);
    localStorage.setItem('itemsInCart', newNum);
    this.props.setCartAmount(newNum);
    fetch('/api/deleteItem', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderItemsId: orderItemsId })
    })
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.queryOrder();
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleSubmit(order) {
    if (this.state.currentOrderArray.length === 0) {
      return;
    }
    const sendTo = order;
    sendTo.orderId = this.state.currentOrderArray[0].orderId;
    sendTo.total = this.state.total;
    sendTo.orderArray = this.state.currentOrderArray;
    this.setState({ checkout: false });
    fetch('/api/customers/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendTo)
    })
      .then(result => {
        return result.json();
      })
      .then(data => {

      })
      .catch(err => {
        console.error(err);
      });
    const items = 0;
    const newNum = JSON.stringify(items);
    localStorage.setItem('itemsInCart', newNum);
    this.props.setCartAmount(newNum);
  }

  renderPage() {
    if (this.state.checkout === false) {
      return <ItemizedCart
      handleRemove={this, this.handleRemove}
      currentOrderArray={this.state.currentOrderArray}
      handleCheckout={this.handleCheckout}
      />;
    } else {
      return <Payment handleSubmit={this.handleSubmit} />;
    }
  }

  checkoutButton() {
    if (this.state.checkout === false) {
      if (this.state.total === null ||
        this.state.total === 0) {
        return;
      }
      return (
        <button className='btn btn-lg btn-primary'
          onClick={this.handleCheckout}>Checkout</button>
      );
    }
  }

  render() {
    return (
      <div className="col d-flex flex-column justify-content-between h-100">
        <div className="row overflow-auto web-scroll">
          {this.renderPage()}
        </div>
        <div className="row">
          <div className="p-2 bg-dark text-light col d-flex justify-content-around align-items-center">
            <h3>Total: ${this.state.total}</h3>
            {this.checkoutButton()}
          </div>
        </div>
      </div>
    );
  }
}

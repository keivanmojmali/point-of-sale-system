import React from 'react';
import RenderItems from '../components/renderItems';
import QueryCategories from '../components/QueryCategories';

export default class TestOrdersPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      categoryData: null,
      // currentOrderId: null,
      directionsModal: true
    };
    this.setTheState = this.setTheState.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(itemId, price) {
    const items = JSON.parse(localStorage.getItem('itemsInCart')) + 1;
    const newNum = JSON.stringify(items);
    const currentOrderId = JSON.parse(localStorage.getItem('currentId'));
    localStorage.setItem('itemsInCart', newNum);
    this.props.setCartAmount(newNum);
    const sendTo = { itemId, orderId: currentOrderId };
    fetch('/api/addTo/openOrders', {
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
  }

  setTheState(input) {
    this.setState(input);
  }

  render() {
    return (
      <div className="col d-flex flex-column h-100">
        <div className="row align-self-start w-100 p-0 m-0">
          <QueryCategories setTheState={this.setTheState}
          categories={this.state.categories}
          />
        </div>
        <div className="row overflow-auto web-scroll h-100">
          <RenderItems handleClick={this.handleClick}
           categoryData={this.state.categoryData} />
        </div>
      </div>
    );
  }
}

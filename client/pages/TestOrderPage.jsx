import React from 'react';
import Navbar from '../components/navbar';
import RenderItems from '../components/renderItems'
import Orders from './orders';
import QueryCategories from '../components/QueryCategories'

export default class TestOrdersPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: null,
      categoryData: null
    }
    this.setTheState = this.setTheState.bind(this);
    this.handleClick = this.handleClick.bind(this)
  };
  handleClick(itemId, price) {
    let sendTo = { itemId, price, orderId: this.state.currentOrderId };
    fetch('/api/addTo/openOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendTo)
    })
      .then(result => {
        return result.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => next(err))
  }
  setTheState(input){


    this.setState(input);
  }
  render() {

    return (

      <div className="container-fluid h-100">
        <div className="row">
          <QueryCategories setTheState={this.setTheState}
          categories={this.state.categories}
          />
        </div>
        <div className="row h-100 scroll">
          <RenderItems handleClick={this.handleClick} categoryData={this.state.categoryData} />
        </div>
      </div>
    )
  }
}

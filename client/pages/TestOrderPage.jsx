import React from 'react';
import Navbar from '../components/navbar';
import RenderItems from '../components/renderItems'
import Orders from './orders';
import QueryCategories from '../components/QueryCategories';
import PopUp from '../components/popUp'

export default class TestOrdersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      categoryData: null,
      currentOrderId: null,
      directionsModal: true,
    }
    this.setTheState = this.setTheState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.popUp = this.popUp.bind(this);
  };
  handleClick(itemId, price) {
    let items = JSON.parse(localStorage.getItem('itemsInCart')) + 1;
    let newNum = JSON.stringify(items)
    localStorage.setItem('itemsInCart', newNum);
    this.props.setCartAmount(newNum);
    let sendTo = { itemId, orderId: this.state.currentOrderId };
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
      })
      .catch(err => {
        console.error(err)
        next(err)})
  }
  setTheState(input){
    this.setState(input);
  }
  componentDidMount(){
    let currentOrderId = JSON.parse(localStorage.getItem('currentId'));
    this.setState( {currentOrderId})
  }
  popUp(){
    if(this.state.directionsModal === false) {
      return;
    }
    return (
        <PopUp setTheState={this.setTheState} />
    )
  }
  render() {
    return (
      <div className="container-fluid h-100">
        <div className="row">
          <QueryCategories setTheState={this.setTheState}
          categories={this.state.categories}
          />
        </div>
        <div className="row lower-height scroll">
          <RenderItems handleClick={this.handleClick}
           categoryData={this.state.categoryData} />
        </div>
        {this.popUp()}
      </div>
    )
  }
}

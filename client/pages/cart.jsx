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
    };
    this.queryOrder = this.queryOrder.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this)
  }
  queryOrder(){
    let localStorageId = JSON.parse(localStorage.getItem('currentId'));
    fetch(`/api/currentOrder/${localStorageId}`)
    .then(result=>{
      return result.json()
    })
    .then(data=>{

      this.setState({currentOrderArray: data});
      let reducerMethod = (accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }
      let total = this.state.currentOrderArray.reduce(reducerMethod, 0);
      if(!Number.isInteger(total) || total < 0) {
        this.setState({ total: 0 });
      } else {
        this.setState({ total });
      }
    })
    .catch(err=>{
      console.error(err)
    })
  }
  componentDidMount(){
    this.queryOrder()
  }
  handleCheckout() {
    this.setState({ checkout: true })
  }
  handleRemove(orderItemsId){

    let items = JSON.parse(localStorage.getItem('itemsInCart')) - 1;
    let newNum = JSON.stringify(items)
    localStorage.setItem('itemsInCart', newNum);
    this.props.setCartAmount(newNum)
    fetch('/api/deleteItem',{
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'orderItemsId': orderItemsId })
    })
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      // let currentOrderArray = [...this.state.currentOrderArray].filter((order)=>{
      //   return order.orderItemsId !== orderItemsId;

      // })
      // this.setState({currentOrderArray})
      this.queryOrder()
    })
    .catch(err=>{
      console.error(err)
    })


  }


  handleSubmit(order) {
    let sendTo = order;
    sendTo.orderId = this.state.currentOrderArray[0].orderId;
    sendTo.total = this.state.total;
    sendTo.orderArray = this.state.currentOrderArray;
    this.setState({ checkout: false});
    fetch('/api/customers/orders',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendTo)
    })
    .then(result =>{
      return result.json();
    })
    .then(data=>{

    })
    .catch(err=>{
      console.error(err)
    })
    let items = 0;
    let newNum = JSON.stringify(items)
    localStorage.setItem('itemsInCart', newNum);
    this.props.setCartAmount(newNum);


  }


  renderPage(){
    if(this.state.checkout === false){
      return <ItemizedCart
      handleRemove={this,this.handleRemove}
      currentOrderArray={this.state.currentOrderArray}
      handleCheckout={this.handleCheckout}
      />
    } else {
      return <Payment handleSubmit={this.handleSubmit} />
    }
  }
  checkoutButton(){
    if(this.state.checkout === false){
      return (
        <button className='btn btn-lg btn-primary'
          onClick={this.handleCheckout}>Checkout</button>
      )
    } else {
      return;
    }
  }
  render() {
    return (
      <div className="col d-flex flex-column justify-content-between position-relative h-100">
        <div className="row scroll h-100 pb-five-percent">
          {this.renderPage()}
        </div>
        <div className="row border-top ">
          <div className="bg-dark text-light col d-flex justify-content-around align-items-center pt-3 pb-4 ">
            <h3>Total: ${this.state.total}</h3>
            {this.checkoutButton()}
          </div>
        </div>
      </div>
    )
  }

}

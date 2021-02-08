import React from 'react';
import ItemizedCart from '../components/itemizedCart';
import Payment from '../components/payment';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      currentOrderArray: null,
      checkout: false
    };
    this.queryOrder = this.queryOrder.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  queryOrder(){
    fetch('/api/currentOrder')
    .then(result=>{
      return result.json()
    })
    .then(data=>{

      this.setState({currentOrderArray: data});
      let reducerMethod = (accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }
      let total = this.state.currentOrderArray.reduce(reducerMethod, 0);
      this.setState({total});
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
  renderPage(){
    if(this.state.checkout === false){
      console.log('if hhhhh');
      return <ItemizedCart

      currentOrderArray={this.state.currentOrderArray}
      handleCheckout={this.handleCheckout}
      />
    } else {
      console.log('else aaaaaa');
      return <Payment />
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
      <div className="container-fluid d-flex flex-column justify-content-between">
        <div className="row">
          {this.renderPage()}
        </div>
        <div className="row border-top ">
          <div className="col d-flex justify-content-around align-items-center pt-3 pb-4">
            <h3>Total: ${this.state.total}</h3>
            {this.checkoutButton()}
          </div>
        </div>
      </div>
    )
  }

}

import React from 'react';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      currentOrderArray: null
    };
    this.renderTotal = this.renderTotal.bind(this);
    this.renderOrder = this.renderOrder.bind(this)
    this.queryOrder = this.queryOrder.bind(this)
  }
  queryOrder(){
    fetch('/api/currentOrder')
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      console.log(data)
      this.setState({currentOrderArray: data});
    })
    .catch(err=>{
      console.error(err)
    })
  }
  renderTotal(){
    if(this.state.currentOrderArray === null) {
      return;
    }
    let reducerMethod = (accumulator,currentValue) => {
      return accumulator + currentValue.price;
    }
    return this.state.currentOrderArray.reduce(reducerMethod,0);
  }
  renderOrder(){
    if (this.state.currentOrderArray === null) {
      return;
    }
    return this.state.currentOrderArray.map((item)=>{
        return (
          <div className="col">
            <div className="row d-flex justify-content-between align-items-center
             border-bottom  ">
              <div className="col">
                <h6>{item.name}</h6>
              </div>
              <div className="col ml-3 d-flex align-items-center justify-content-end">
                <h6>${item.price}</h6>
                <i className=' ml-4 fas fa-minus'></i>
              </div>
            </div>
          </div>
        )
      })
  }
  componentDidMount(){
    this.queryOrder()
  }
  render() {
    return (
      <div className="container d-flex flex-column justify-content-between p-4">
        <div className="row">
          <div className="col">
            {/* THIS IS THE PART OF THE CART THAT IS RENDERING THE SHOPPING CART
      WILL NEED TO SCROLL SO IT DOES NOT GET IN THE WAY OF THE CHECKOUT BUTTON */}
            {this.renderOrder()}
          </div>
        </div>
        <div className="row border-top">
          {/* MAKE THIS ROW STICK TO THE BOTTOM
        THIS IS WHERE THE TOTAL AND THE CHECKOUT WILL GO  */}
          <div className="col d-flex justify-content-around align-items-center pt-3 pb-4">
            <h3>Total: ${this.renderTotal()}</h3>
            <button className='btn btn-lg btn-primary'
              onClick={this.handleClick}>
              Checkout
        </button>
          </div>
        </div>
      </div>
    )
  }





}

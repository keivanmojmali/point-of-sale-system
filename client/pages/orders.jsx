import React from 'react';


//once tyhe checkout button is set or the reset button - it needs to add 1 to the ordercount in thr system
// that is how we are going to keep track of the order count



export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersArray = [];
    };
    this.ordersArray = [];
    this.querryOrders = this.querryOrders.bind(this);
    this.renderArray = this.renderArray.bind(this);
  };
  querryOrders(){
    // THIS IS THE GET METHOD - SAVES TO ORDERARRAY
    //IF DATA DOES NOT PROPERLY RENDER - THEN ASYNC NEEDS
    //TO BE HANDLED THEN DATA RETURNED
    //DOUBLE CHECK METHOD / THIS HAS NO BODY

    fetch('/api/orderItems/', {
      method: 'GET',
    })
    .then(result.json())
    .then(result=>{
      this.ordersArray = result.rows;
      //change this to state
    })
    .catch(err=>next(err));

  };
  handleClick(orderId){
    //take the order id and then change it to the past orders table

  };
  componentDidMount(){
    this.querryOrders();
  }
  renderArray(){
    this.state.ordersArray.map((order)=>{
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <h6>{order.customerName}</h6>
              //you need to add the cusomter name here - somehow when you querry
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Order:</h6>
              {order.name}{order.count}
            </div>
            <div className="col">
              <button onClick={()=>{this.handleClick(order.itemId)}} className='btn btn-sm btn-primary'>Complet</button>
            </div>
          </div>
        </div>
      </div>
    })
  };
  render(){
    <div className="container">
      <div className="row">
        <div className="col">
          {this.renderArray()}
        </div>
      </div>
    </div>



  }
}

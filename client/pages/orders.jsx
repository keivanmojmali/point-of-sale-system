import React from 'react';

export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null
    }
  this.renderOrders = this.renderOrders.bind(this);
  this.orderLi = this.orderLi.bind(this);
  this.handleClick = this.handleClick.bind(this);
  };
  orderLi(orderArray) {
    return orderArray.map((item)=>{
      let parsed = JSON.parse(item);
      return <li key={parsed.orderItemsId}>
        {parsed.name}
      </li>
    })
  };
  handleClick(itemId){
    let fetchBody = {"orderId":itemId};
    fetch('/api/orders/complete',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchBody)
    })
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      fetch('/api/getAll/orders')
      .then(result=>result.json())
      .then(data=>{
        this.setState({orders: data})
      })
      .catch(err=>console.error(err))
    })
    .catch(err=>console.error(err))
  }
  renderOrders(){
    if(this.state.orders === null){
      return;
    }
    if(this.state.orders.length === 0) {
      return (
        <div>
          <div className="row small-gray-nav"></div>
          <div className='row d-flex text-center flex-column align-items-center'>
            <h1>There are currently 0 open orders.</h1>
            <h1>Great job, team!</h1>
          </div>
        </div>
      )
    }
    return this.state.orders.map((order)=>{
      return (
        <div className="row border border-dark mb-2" key={order.customerId}>
          <div className="col">
            <div className="row bg-dark text-light">
              <div className="col">
                {order.firstName} {order.lastName}
              </div>
              <div className="col">
                <div className="row">
                  <div className="col text-right">
                    Order #{order.orderId}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    Total: ${order.total}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4>Order:</h4>
                <ul>
                  {this.orderLi(order.orderArray)}
                </ul>
              </div>
              <div className="col pt-2 text-right">
                <button onClick={()=>{this.handleClick(order.orderId)}} className='btn btn-sm btn-primary'>Complete</button>
              </div>
            </div>
          </div>
        </div>
      )
    })
  };
  componentDidMount(){
    fetch('/api/getAll/orders')
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      this.setState({orders: data})
    })
    .catch(err=>next(err))
  }
  render(){
return (
  <div className="col p-4">
    {this.renderOrders()}
  </div>
    )
  }
}

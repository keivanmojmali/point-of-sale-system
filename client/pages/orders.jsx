import React from 'react';

export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null
    }
  this.renderOrders = this.renderOrders.bind(this)
  };

  renderOrders(){
    if(this.state.orders === null){
      return;
    }
    return this.state.orders.map((order)=>{

      return (
        <div className="row border-one">
          <div className="col">
            <div className="row bg-dark text-light">
              {order.firstName} {order.lastName}
            </div>
            <div className="row">
              <div className="col">
                <h4>Order:</h4>
                <ul>

{/* MAP FUNCTION HERE THAT WILL
MAP THE ARRAY OF ITEMS IN THE ORDER THEN LIST THE CONTENTS
INSIDE HERE */}



                </ul>
              </div>
              <div className="col">
                <button className='btn btn-sm btn-primary'>Complete</button>
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
      console.log(data);
      this.setState({orders: data})
    })
    .catch(err=>next(err))
  }
  render(){
return (
  <div className="containier-fluid p-3">
    {this.renderOrders()}
  </div>
)
  }

}

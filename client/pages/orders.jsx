import React from 'react';

export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null;
    }
  this.renderOrders = this.renderOrders.bind(this)
  };

  renderOrders(){

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
    <div className="containier p-3">
      {this.renderOrders}
    </div>
  }




}

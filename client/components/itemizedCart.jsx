import React from 'react';

export default class ItemizedCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder() {
    if (this.props.currentOrderArray === null) {
      return;
    }
    if (this.props.currentOrderArray.length === 0) {
      return (
        <div className='text-center mt-5'>
          <h1>Cart is currently empty. <br/> Start order on Orders page.</h1>
        </div>
      );
    }
    return this.props.currentOrderArray.map(item => {
      return (
        <div className="col m-1" key={item.orderItemsId}>
          <div className="row d-flex justify-content-between align-items-center
             border-bottom  ">
            <div className="col">
              <h6>{item.name}</h6>
            </div>
            <div className="col ml-3 d-flex align-items-center justify-content-end">
              <h6>${item.price}</h6>
              <i onClick={() => { this.props.handleRemove(item.orderItemsId); }} className=' ml-4 fas fa-minus'></i>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container pt-4">
        <div className="row d-flex flex-column">
            {this.renderOrder()}
        </div>
      </div>
    );
  }
}

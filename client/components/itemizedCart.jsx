import React from 'react';

export default class ItemizedCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
     this.renderOrder = this.renderOrder.bind(this);
  }
  renderOrder() {
    if (this.props.currentOrderArray === null) {
      return;
    }
    return this.props.currentOrderArray.map((item) => {
      return (
        <div className="col" key={item.orderItemsId}>
          <div className="row d-flex justify-content-between align-items-center
             border-bottom  ">
            <div className="col">
              <h6>{item.name}</h6>
            </div>
            <div className="col ml-3 d-flex align-items-center justify-content-end">
              <h6>${item.price}</h6>
              <i onClick={()=>{this.props.handleRemove(item.orderItemsId)}} className=' ml-4 fas fa-minus'></i>
            </div>
          </div>
        </div>
      )
    })
  }
  render() {

    return (
      <div className="container d-flex flex-column justify-content-between pt-4">
        <div className="row">
          <div className="col ">
            {/* THIS IS THE PART OF THE CART THAT IS RENDERING THE SHOPPING CART
      WILL NEED TO SCROLL SO IT DOES NOT GET IN THE WAY OF THE CHECKOUT BUTTON */}
            {this.renderOrder()}
          </div>
        </div>
      </div>
    )
  }


}

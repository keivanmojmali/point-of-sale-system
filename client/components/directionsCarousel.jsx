import React from 'react';

export default class DirectionsCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIndex: 0,
      directions: [
        'Images/start-order.gif',
        'Images/cart.gif',
        'Images/checkout.gif',
        'Images/orders.gif',
        'Images/inventory-1.gif',
        'Images/inventory-2.gif'
      ]
    };
    this.handleForward = this.handleForward.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.currentPath = this.currentPath.bind(this);
    this.directions = this.directions.bind(this);

  }

  handleForward() {
    if (this.state.displayIndex === this.state.directions.length - 1) {
      this.setState({ displayIndex: 0 });
    } else {
      const newNum = this.state.displayIndex + 1;
      this.setState({ displayIndex: newNum });
    }
  }

  handleBack() {
    if (this.state.displayIndex === 0) {
      const last = this.state.directions.length - 1;
      this.setState({ displayIndex: last });
    } else {
      const newNum = this.state.displayIndex - 1;
      this.setState({ displayIndex: newNum });
    }
  }

  directions() {
    switch (this.state.displayIndex) {
      case 0:
        return (
          <div className="col">
            <h5>Start order by choosing category.</h5>
            <h5>Click button to add to cart.</h5>
          </div>
        );
      case 1:
        return (
          <div className="col">
            <h5>View itemized list of cart.</h5>
            <h5>Remove item using minus sign next to item.</h5>
          </div>
        );
      case 2:
        return (
          <div className="col">
            <h5>Initiat payment process using "checkout" button.</h5>
            <h5>Provide requested information and click "Submit."</h5>
          </div>
        );
      case 3:
        return (
          <div className="col">
            <h5>Review all open orders.</h5>
            <h5>Once order fulfilled, press "Complete" to remove order.</h5>
          </div>
        );
      case 4:
        return (
          <div className="col">
            <h5>View inventory using category menu</h5>
          </div>
        );
      case 5:
        return (
          <div className="col">
            <h5>Edit inventory using "Edit" button</h5>
          </div>
        );
    }
  }

  currentPath() {
    if (this.state.directions === null) {
      return '';
    }
    const current = this.state.displayIndex;
    const currentPath = this.state.directions[current];
    return currentPath;
  }

  render() {
    return (
      <div className="carousel mt-3 carousel-max">
        <div className="row ">
          {this.directions()}
        </div>
        <div className="row d-flex">
          <div className="col d-flex justify-content-center align-items-center p-3 image-container">
            <img className="img-fluid" src={this.currentPath()} alt="directions" />
          </div>
        </div>
        <div className="row border border-primary">
          <div onClick={this.handleBack} className="red col d-flex justify-content-center align-items-center">
            <i className="fas fa-chevron-left"></i>
            <h5 className='mr-1 mt-1'>Previous</h5>
          </div>
          <div onClick={this.handleForward} className="red col d-flex justify-content-center align-items-center">
              <h5 className='mr-1 mt-1'>Next</h5>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    );
  }
}

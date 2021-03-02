import React from 'react';
import DirectionsCarousel from './directionsCarousel';

export default class RenderItems extends React.Component {
  constructor(props) {
    super(props);
    this.renderData = this.renderData.bind(this);
    this.handleClick = this.props.handleClick.bind(this);
    this.modal = this.modal.bind(this);
  }

  renderData() {
    if (this.props.categoryData === null) {
      // return <DirectionsCarousel />;
      return;
    }
    return this.props.categoryData.map(item => {
      return (
      <button key={item.itemId} className="item-width btn-outline-info row m-1 text-dark" onClick={() => { this.handleClick(item.itemId, item.price); }}>
        <div className="col">
          <img className="img-fluid mt-1 test" src={item.img} alt="Drink Image" />
          <h4>{item.name}</h4>
          <h6> <span className='font-weight-bold'>Price:</span> {item.price}</h6>
          <h6> <span className='font-weight-bold'> in Stock:</span> {item.stock}</h6>
        </div>
      </button>
      );
    });
  }

  modal() {
    return (
      <div className="modal fade show" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Point of Sale <br /> and Inventory Management Application</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <DirectionsCarousel />
      </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="col d-flex flex-wrap justify-content-center">
        {this.renderData()}
        {this.modal()}
        <div className='d-flex flex-column align-items-center justify-content-center h-100 text-center'>
          <h3>Welcome to Point of Sale and <br/>
           Inventory Management Application</h3>
          <p>
            An enterprise application for brick-and-mortar retailers that conduct in-person sales. <br/>
            This all-in-one application allows retailers to sell their products, keep track of inventory, <br/>
            collect payments, track open orders, without being tied down to a single location.
          </p>
          <p>
            Press the button below for a qucik walk through of the features.
          </p>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Launch Walk Through
</button>
        </div>
      </div>
    );
  }
}

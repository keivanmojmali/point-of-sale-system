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
      <div className="modal" tabIndex='-1' role='dialog'>
        <div className="modal-dialog modal-dialog-centered" role='document'>
          <div className="modal-content">
            <div className="modal-header">
              <button className='close' type='button' data-dismiss='modal' aria-label='close'>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <DirectionsCarousel />
            </div>
            <div className="modal-footer">
              <button>Hello</button>
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
      </div>
    );
  }
}

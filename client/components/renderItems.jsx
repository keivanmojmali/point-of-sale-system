import React from 'react';
import StartOrder from './startOrder';

export default class RenderItems extends React.Component {
  constructor(props) {
    super(props)
    this.renderData = this.renderData.bind(this);
    this.handleClick = this.props.handleClick.bind(this);
  }
renderData(){
  if (this.props.categoryData === null) {
    return <StartOrder handleClick={this.props.handleClick} />
  }
  return this.props.categoryData.map((item) => {
    return (
      <button key={item.itemId} className="item-width btn-outline-info row m-1 text-dark" onClick={() => { this.handleClick(item.itemId, item.price) }}>
        <div className="col">
          <img className="img-fluid mt-1 test" src={item.img} alt="Drink Image" />
          <h4>{item.name}</h4>
          <h6> <span className='font-weight-bold'>Price:</span> {item.price}</h6>
          <h6> <span className='font-weight-bold'> in Stock:</span> {item.stock}</h6>
        </div>
      </button>
    )
  })
}

  render(){
    return(
      <div className="col d-flex flex-wrap justify-content-center">
        {this.renderData()}
      </div>
    )
  }
}

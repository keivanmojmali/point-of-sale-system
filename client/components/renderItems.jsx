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
      <button key={item.itemId} className="btn-outline-info row twenty-basis m-1 text-dark" onClick={() => { this.handleClick(item.itemId, item.price) }}>
        <div className="col thirty-basis">
          <img className="img-fluid mt-1" src={item.img} alt="Drink Image" />
          <h4>{item.name}</h4>
          <h6>Price: {item.price}</h6>
          <h6>in Stock: {item.stock}</h6>
        </div>
      </button>
    )
  })
}

  render(){
    return(
      <div className="col category-design">
        {this.renderData()}
      </div>
    )
  }
}

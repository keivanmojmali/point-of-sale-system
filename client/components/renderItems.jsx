import React from 'react';

export default class RenderItems extends React.Component {
  constructor(props) {
    super(props)
    this.renderData = this.renderData.bind(this);
    this.handleClick = this.props.handleClick.bind(this);
  }
renderData(){
  if(this.props.categoryData === null) {
    return;
  }
  return this.props.categoryData.map((item) => {
    return (
      <div className="col thirty-basis" onClick={() => { this.handleClick(item.itemId, item.price) }}>
        <img className="img-thumbnail" src={item.img} alt="Drink Image" />
        <h4>{item.name}</h4>
        <h6>{item.description}</h6>
        <h6>Price: {item.price}</h6>
        <h6>in Stock: {item.stock}</h6>
      </div>
    )
  })
}

  render(){
    return(
      <div className="row  category-design larger-padding">
        {this.renderData()}
      </div>
    )
  }
}

import React from 'react';

export default class RenderInventory extends React.Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);
  };
  renderRows(){
    if(this.props.categoryData === null){
      return;
    }
    return this.props.categoryData.map((row,index)=>{
      let rowClass = 'bg-light text-dark'
      if(index % 2 === 0) {
        rowClass = 'bg-dark text-light'
      }
      return (
        <tr className={rowClass}>
          <td>
            <button
            onClick={()=>{this.props.handleClick(row)}}
            className='btn btn-sm btn-primary'>
              Edit: {row.itemId}
            </button>
          </td>
          <td>{row.type}</td>
          <td>{row.name}</td>
          <td>{row.description}</td>
          <td>{row.price}</td>
          <td>{row.stock}</td>
        </tr>
      )
    })
  }
  render(){
    return(
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>ItemId</th>
            <th scope='col'>Type</th>
            <th scope='col'>Name</th>
            <th scope='col'>Description</th>
            <th scope='col'>Price</th>
            <th scope='col'>Stock</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }
}

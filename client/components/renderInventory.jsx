import React from 'react';

export default class RenderInventory extends React.Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);
    this.renderInstruction = this.renderInstruction.bind(this);
  }

  renderRows() {
    if (this.props.categoryData === null) {
      return;
    }

    return this.props.categoryData.map((row, index) => {
      let rowClass = 'bg-light text-dark';
      if (index % 2 === 0) {
        rowClass = 'bg-dark text-light';
      }
      return (
        <tr className={rowClass} key={row.itemId}>
          <td>
            <button
            onClick={() => { this.props.handleClick(row); }}
            className='btn btn-sm btn-primary'>
              Edit: {row.itemId}
            </button>
          </td>
          <td>{row.type}</td>
          <td>{row.name}</td>
          <td>{row.price}</td>
          <td>{row.stock}</td>
        </tr>
      );
    });
  }

  renderInstruction() {
    if (this.props.categoryData === null) {
      return (
        <div className='row d-flex text-center flex-column align-items-center mt-5 p-2'>
          <h1>Inventory Management:</h1>
          <h3>View Inventory by Category.</h3>
          <h3>Edit Inventory using "Edit" Button.</h3>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='col'>
        <table className='table'>
          <thead>
            <tr className=''>
              <th scope='col'>ItemId</th>
              <th scope='col'>Type</th>
              <th scope='col'>Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Stock</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        {this.renderInstruction()}
      </div>
    );
  }
}

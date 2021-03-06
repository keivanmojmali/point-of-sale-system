import React from 'react';
import RenderInventory from '../components/renderInventory';
import QueryCategories from '../components/QueryCategories';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      categoryData: null,
      displayModal: false,
      editModal: null
    };
    this.setTheState = this.setTheState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.exitModal = this.exitModal.bind(this);
  }

  setTheState(object) {
    this.setState(object);
  }

  handleClick(object) {
    this.setState({ displayModal: true, editModal: object });
  }

  exitModal() {
    this.setState({ displayModal: false, editModal: null });
  }

  handleSubmit() {
    event.preventDefault();
    fetch('/api/category/updateItem', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.editModal)
    })
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ displayModal: false, editModal: null });
      })
      .catch(err => console.error(err));

  }

  onChange(event) {
    const editModal = this.state.editModal;
    editModal[event.target.name] = event.target.value;
    this.setState({ editModal });
  }

  displayModal() {
    if (this.state.displayModal === false) {
      return;
    }
    return (
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Item Id: {this.state.editModal.itemId}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="#" className='d-flex'>
                <div className='m-1 p-1'>
                  <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input className='form-control' type="text" name='type' value={this.state.editModal.type} onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' name='name' value={this.state.editModal.name} onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className='form-control' name='description' value={this.state.editModal.description} onChange={this.onChange} />
                  </div>
                </div>
                <div className='m-1 p-1'>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text" className='form-control' name='price' value={this.state.editModal.price} onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input type="text" name='stock' className='form-control' value={this.state.editModal.stock} onChange={this.onChange} />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button onClick={this.handleSubmit} type='button' data-dismiss="modal" className='btn btn-primary'> Submit Changes</button>
            </div>
          </div>
        </div>
      </div>
    );

  }

  render() {
    return (
      <div className="col d-flex flex-column h-100">
        <div className="row">
          {this.displayModal()}
        </div>
        <div className="row align-self-start w-100 p-0 m-0">
          <QueryCategories
            setTheState={this.setTheState}
            categories={this.state.categories}
          />
        </div>
        <div className="row overflow-auto web-scroll">
          <RenderInventory
            categoryData={this.state.categoryData}
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

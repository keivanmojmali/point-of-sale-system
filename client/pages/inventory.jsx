import React from 'react';
import RenderInventory from '../components/renderInventory';
import QueryCategories from '../components/QueryCategories';

export default class Inventory extends React.Component {
  constructor(props){
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
  setTheState(object){
    this.setState(object);
  };
  handleClick(object){
    this.setState({displayModal: true, editModal: object});
  };
  exitModal(){
    this.setState({displayModal:false, editModal:null});
  }
  handleSubmit(){
    fetch('/api/category/updateItem',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.editModal)
    })
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      this.setState({displayModal:false, editModal: null})
    })
    .catch(err=>console.error(err))
  }
  onChange(event){
    let editModal = this.state.editModal;
    editModal[event.target.name] = event.target.value;
    this.setState({editModal});
  }
    displayModal(){
      if(this.state.displayModal === false) {
        return;
      }
      console.log('aaaa',this.state.editModal)
      return (
            <div className='change-modal'>
              <div className="d-flex justify-content-between">
              <h4>Item Id: {this.state.editModal.itemId}</h4>
              <i className='fas fa-times text-light' onClick={this.exitModal}></i>
              </div>
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
                <label htmlFor="description">description</label>
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
              <div>
                <button onClick={this.handleSubmit} type='submit' className=' btn btn-primary btn-lg'> Submit Changes</button>
              </div>
                </div>
              </form>
            </div>
      )
    }
  render(){
    console.log('the state',this.state)
    return (
      <div className="container-fluid h-100">
        <div className="row">
          {this.displayModal()}
        </div>
        <div className="row">
          <QueryCategories
          setTheState={this.setTheState}
          categories={this.state.categories}
          />
        </div>
        <div className="row h-100 scroll">
        <RenderInventory
        categoryData={this.state.categoryData}
        handleClick={this.handleClick}
        />
        </div>
      </div>
    )
  }
}

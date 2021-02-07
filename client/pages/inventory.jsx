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
  }
  setTheState(object){
    this.setState(object);
  };
  handleClick(object){
    console.log(object);
    this.setState({displayModal: true, editModal: object});
  };
  handleSubmit(){
    fetch('/api/category/updateItem',{
      method: 'Patch',
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
    this.setState({event.target.name: event.target.value});
  }
    displayModal(){
      if(this.state.displayModal === false) {
        return;
      }
      console.log('aaaa',this.state.editModal)
      return (
        <div className='col modal'>
          <h4>{this.state.editModal.itemId}</h4>
          <form action="#">
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input className='form-control' type="text" name='type' value={this.state.editModal.type} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className='form-control' name='name' value={this.state.editModal.name} onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="description">description</label>
              <input type="text" className='form-control' name='description' value={this.state.editModal.description} onChange={this.onChange}  />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="text" className='form-control' name='price' value={this.state.editModal.price} onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input type="text" name='stock' className='form-control' value={this.state.editModal.stock} onChange={this.onChange}/>
            </div>
            <div>
            <button onClick={this.handleSubmit} type='submit' className=' btn btn-primary btn-lg'> Submit Changes</button>
            </div>
          </form>
        </div>
      )
    }
  render(){
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

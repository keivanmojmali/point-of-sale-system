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
    };
    this.setTheState = this.setTheState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  setTheState(object){
    this.setState(object);
  };
  handleClick(object){
    console.log('HAHAHAHA',object);

    /*
    ADD THE MODAL HERE THAT WILL OPEN UP AND CHANGE THE
    WITH THE INFO OF THE OBJECT THAT WAS SENT IN AS
    THE VALUES
    THEN ONCE IT HAS BEEN SENT AND SUBMITTED -
    IT WILL PATCH IN THE INFORMATION
    THEN RE-REQUEST THE CATEGORY DATA AND SET THE STATE
    */



//handleSubmit
  }
    displayModal(selectedItem){
      let modalClass = 'col modal display-none';
      if(this.state.displayModal === true) {
        modalClass = 'col modal'
      }
      return (
        <div className={modalClass}>
          <h4>{selectedItem.itemId}</h4>
          <form action="#">
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input className='form-control' type="text" name='type' value={selectedItem.type} />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className='form-control' name='name' value={selectedItem.name}/>
            </div>
            <div className="form-group">
              <label htmlFor="description">description</label>
              <input type="text" className='form-control' name='description' value={selectedItem.description}  />
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

import React from 'react';
import RenderInventory from '../components/renderInventory';
import QueryCategories from '../components/QueryCategories';

export default class Inventory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories: null,
      categoryData: null
    };
    this.setTheState = this.setTheState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  setTheState(object){
    this.setState(object);
  };
  handleClick(object){
    console.log(object);

    /*
    ADD THE MODAL HERE THAT WILL OPEN UP AND CHANGE THE
    WITH THE INFO OF THE OBJECT THAT WAS SENT IN AS
    THE VALUES
    THEN ONCE IT HAS BEEN SENT AND SUBMITTED -
    IT WILL PATCH IN THE INFORMATION
    THEN RE-REQUEST THE CATEGORY DATA AND SET THE STATE
    */


  }
  render(){
    console.log('THE STATE',this.state)
    return (
      <div className="container-fluid h-100">
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

import React from 'react';

export default class Pos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: false,
      checkout: false,
      category: null
    };
    this.renderCategories = this.renderCategories.bind(this);
    this.inventory = this.inventory.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };
  renderCategories(){
    //add a fetch here that will
    //get the category data and then return
    //categories names and then return the names
    //make sure the group is by type

  };
  renderData() {
    if(this.state.category === null) {
      return;
    }
    //this needs to render the data based on the categories

  }
  handleClick(event){
    //you need to have an orderId counter here that is pulled from the db or
    //somewhere else  so when you pull from the orderItems you know
    //which orders are from where
  }
  render(){
    this.getData();
    <div className="container">
      <div className="row">
        <div className="col">
          //this is where the columns will go to
        </div>
        <div className="col">
          <div className="row">
            //this is where the buttons for the
            //orders will display
          </div>
        </div>
      </div>
    </div>
  }



}

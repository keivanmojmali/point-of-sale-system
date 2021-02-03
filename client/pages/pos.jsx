import React from 'react';

export default class Pos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: []
    };
    this.getData = this.getData.bind(this);
    this.renderData = this.renderData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };
  getData(){
    //add a fetch here that will
    //get the category data and then return
    //categories names and then return the names
    //make sure the group is by type
    fetch('/api/category/getAll',{
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(result=>{
      this.setState({category: result})
    })
    .catch(err => next(err))

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
  componentDidMount(){
    this.getData();
  }
  render(){

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            {/* //this is where the columns will go to */}
            <h4>HIIIIIIIIIII</h4>
          </div>
          <div className="col">
            <div className="row">
              {/* //this is where the buttons for the
            //orders will display */}
              <h4>HIIIIIIII</h4>
            </div>
          </div>
        </div>
      </div>
    )
          }

}

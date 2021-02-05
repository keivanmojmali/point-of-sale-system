import React from 'react';

export default class Pos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: null,
      categories: [],
      categoryData: []
    };
    this.getData = this.getData.bind(this);
    this.renderData = this.renderData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCategoryData = this.getCategoryData.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
  };
  getData(){
    fetch('/api/category/getAll')
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      this.setState({categories: data})})
    .catch(err=>{
      next(err)
    })
  }
  getCategoryData(event){
        this.setState({ currentCategory: event.target.textContent })
        let cat = event.target.textContent;
        fetch(`api/category/byType/${cat}`)
        .then(result => {
            return result.json()
          })
          .then(data => {

            this.setState({ categoryData: data })
          })
          .catch(err => {
            next(err)})
}

renderData(){
  return this.state.categoryData.map((item)=>{
    return (
      <div className="col smaller" onClick={() => { this.handleClick(item.itemId) }}>
        <img className="img-thumbnail" src={item.img} alt="Drink Image" />
        <h4>{item.name}</h4>
        <h5>{item.description}</h5>
        <h6>{item.price}</h6>
        <h6>{item.stock}</h6>
      </div>
    )
  })
}

  renderCategories() {
    return this.state.categories.map((category)=>{
      return (
        <button className='btn btn-primary mt-2 mb-2' onClick={this.getCategoryData}>
          <h5>{category.type}</h5>
        </button>
      )
    })
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
      <div className="col h-100 bg-dark">
        <div className="row h-100">
          <div className="col-sm d-flex flex-column h-100">
            {this.renderCategories()}
          </div>
          <div className="col">
            {this.renderData()}
          </div>
        </div>
      </div>
    )
}
}

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
            console.log(data)
            this.setState({ categoryData: data })
          })
          .catch(err => {
            console.error(err)
            next(err)})
}

renderData(){
  return this.state.categoryData.map((item)=>{
    return (
      <div className="col" onClick={() => { this.handleClick(item.itemId) }}>
        <img className="img-fluid" src={item.img} alt="Drink Image" />
        <h4>{item.name}</h4>
        <h4>{item.description}</h4>
        <h6>{item.price}</h6>
        <h6>{item.stock}</h6>
      </div>
    )
  })
}

  renderCategories() {
    return this.state.categories.map((category)=>{
      return (
        <button className='btn btn-primary btn-sm mt-2 mb-2 p-1' onClick={this.getCategoryData}>
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
console.log(this.state)
    return (
      <div className="container">
        <div className="row">
          <div className="col d-flex flex-column column-left">
            {this.renderCategories()}
          </div>
          <div className="col right">
            {this.renderData()}
          </div>
        </div>
      </div>
    )
}
}

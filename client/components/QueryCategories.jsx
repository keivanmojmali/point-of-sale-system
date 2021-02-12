import React from 'react';

export default class QueryCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getData = this.getData.bind(this);
    this.getCategoryData = this.getCategoryData.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
  };

  getData(){

    fetch('/api/category/getAll')
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      this.props.setTheState({'categories': data})
    })
      .catch(err=>{
        console.error(err)
      })
  }
  renderCategories() {
    if(this.props.categories === null){
      return;
    }
    return this.props.categories.map((category)=>{
      return (
        <div className="col d-flex justify-content-center" key={category.type}>
          <button className='btn btn-primary mt-2 mb-2' onClick={this.getCategoryData}>
            <h5>{category.type}</h5>
          </button>
        </div>
      )
    })
  }
  getCategoryData(event) {
    let cat = event.target.textContent;
    fetch(`api/category/byType/${cat}`)
      .then(result => {
        return result.json()
      })
      .then(data => {
        this.props.setTheState({'categoryData':data})
      })
      .catch(err => {
        next(err)
      })
  }

  componentDidMount(){
    this.getData();
  }

  render(){

    return (
      <div className="col h-100 bg-dark text-light">
        <div className="row category-design border-bottom">
          <h4>Categories:</h4>
        </div>
        <div className="row category-design border-bottom">
          {this.renderCategories()}
        </div>
      </div>

    )
}

}

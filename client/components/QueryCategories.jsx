import React from 'react';

export default class QueryCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getData = this.getData.bind(this);
    this.getCategoryData = this.getCategoryData.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
  }

  getData() {
    fetch('/api/category/getAll')
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.props.setTheState({ categories: data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderCategories() {
    if (this.props.categories === null) {
      return;
    }
    return this.props.categories.map(category => {
      return (
        <li className="nav-item align-self-center ml-2" key={category.type}>
          <button className='btn btn-outline-light mt-2 mb-2 cat-btn-width h-100' onClick={this.getCategoryData}>
            <h5>{category.type}</h5>
          </button>
        </li>
      );
    });
  }

  getCategoryData(event) {
    const cat = event.target.textContent;
    fetch(`api/category/byType/${cat}`)
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.props.setTheState({ categoryData: data });
      })
      .catch(err => {
        next(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light w-100">
        <a className="navbar-bran text-light mr-2" href="#"><h3>Categories</h3></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.renderCategories()}
          </ul>
        </div>
      </nav>

    )
  }
}

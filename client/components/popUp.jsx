import React from 'react';


export default class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIndex: 0,
      directions: null,
    };
    this.handleForward = this.handleForward.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.goDirect = this.goDirect.bind(this);
    this.currentPath = this.currentPath.bind(this);
    // this.renderCircles = this.renderCircles.bind(this);

  };
  handleForward() {
    if (this.state.displayIndex === this.state.directions.length - 1) {
      this.setState({ displayIndex: 0 })
    } else {
      let newNum = this.state.displayIndex + 1;
      this.setState({ displayIndex: newNum });
    }
  };
  handleBack() {
    if (this.state.displayIndex === 0) {
      let last = this.state.directions.length - 1;
      this.setState({ displayIndex: last });
    } else {
      let newNum = this.state.displayIndex - 1;
      this.setState({ displayIndex: newNum });
    }
  };
  goDirect(event) {
    this.setState({ displayIndex: event });
  };
  // renderCircles() {
  //   return this.state.directions.map((item, index) => {
  //     let iconClass = 'far fa-circle';
  //     if (item.id === this.state.directions[this.state.displayIndex].id) {
  //       iconClass = 'fas fa-circle';
  //     }
  //     return (
  //       <li onClick={() => this.goDirect(index)}><i className={iconClass}></i></li>
  //     )
  //   })
  // };
  componentDidMount(){
    fetch('/api/getDirections')
    .then(result=>result.json())
    .then(data => {
      console.log(data)
      this.setState({directions: data})
    })
    .catch(err=>console.error(err))
  }
  currentPath(){
    if(this.state.directions === null){
      return '';
    }
    console.log('ithithere')
    const current = this.state.displayIndex;
    const currentPath = this.state.directions[current].src;
    return currentPath;
  }
  render() {
    console.log('state',this.state)
    return (
      <div className="container carousel pop-up">
        <div className="row d-flex">
          <div onClick={this.handleBack} className="col d-flex justify-content-center align-items-center">
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="col d-flex justify-content-center align-items-center p-3 image-container">
            <img className="img-fluid" src={this.currentPath()} alt="directions" />
          </div>
          <div onClick={this.handleForward} className="col d-flex justify-content-center align-items-center">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <ul className="d-flex list-unstyled">
              {/* {this.renderCircles()} */}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

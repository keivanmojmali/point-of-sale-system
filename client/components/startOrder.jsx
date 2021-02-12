import React from 'react';

export default class StartOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestSeller: null
    }
    this.getDay = this.getDay.bind(this);
    this.renderBestSellers = this.renderBestSellers.bind(this)
  }
  getDay(){
    const monthList = ['January','Feburary','March','April','May','June','July','August','September','October','November','December']
    const today = new Date();
    const month = monthList[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();
    return `${month}, ${day}, ${year}`
  }
  componentDidMount(){
    fetch('/api/bestSeller')
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      this.setState({bestSeller:data})
    })
    .catch(err=>{
      console.error(err)
    })
  }
  renderBestSellers(category) {
    if(this.state.bestSeller === null) {
      return;
    }
    return this.state.bestSeller.map((item)=>{
      return (
        <div key={item.bestSellerId} onClick={() => { this.props.handleClick(item.itemId, item.price) }} className="col text-center twenty-basis">
          <img className='img-fluid' src={item.img} alt="best seller" />
          <h4>{item.name}</h4>
        </div>
      )
    })
  }
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col m-2 text-center">
              <h2>Today is {this.getDay()}. Let's Make it a Great Day!</h2>
            </div>
          </div>

          <div className="row thirty-basis d-flex flex-wrap best-seller p-1">
            {this.renderBestSellers()}
          </div>

        </div>
      </div>
    )
  }



}

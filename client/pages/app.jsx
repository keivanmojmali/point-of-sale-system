import React from 'react';
import Navbar from '../components/navbar';
import Orders from './orders';
import Pos from './pos';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   route: parseRoute(window.location.hash),
    // };
    this.renderPage = this.renderPage.bind(this);
  };
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      })
    });
    //if you want to add log in and log out tokens -
    //this is where you would set and store them
  };
  renderPage() {

 //ONCE YOU FIGURE OUT THE HAS ROUTES THEN YOU CAN TEST THE ROUTE RETURNS
    // switch(this.state.route){
    //   case 'pos':
    //     return <Pos />;
    //     break;
    //   case 'orders':
    //     return <Orders />;
    //     break;
    //   case 'inventory':
    //     return <Inventory />;
    // }
  };
  render() {
    return (

      <div className="container h-100">
        <div className="row top-bar">
        </div>
        <div className="row">
            <Pos />
        </div>
        <div className="row">
            <div className="col p-0 ">
            <Navbar />
            </div>
        </div>
      </div>
    )
  }
}

import React from 'react';
import Navbar from '../components/navbar';
import Inventory from './inventory';
import TestOrdersPage from './TestOrderPage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // route: parseRoute(window.location.hash),

    };
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
    //     return <TestOrdersPage />;
    //     break;
    //   case 'inventory':
    //     return <Inventory />;
    // }
  };
  render() {
    return (

      <div className="container-fluid h-100">
        <div className="row h-100">
            <Inventory />
        </div>
        <div className="row">
            <div className="col p-0 navbar-design">
            <Navbar />
            </div>
        </div>
      </div>
    )
  }
}

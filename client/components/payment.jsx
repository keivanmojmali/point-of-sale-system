import React from 'react';

export default class Payment extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      fName: '',
      lName: '',
      cc: '',
      address: '',
      phone: ''
    }
  }
  setValue(event){
    this.setState({event.target.name: event.target.value})
  }
  render() {
    return (
      <form action="#" className='h-100 w-100 p-5 d-flex flex-column align-items-between'>
        <div className="form-group d-flex justify-content-center">
          <h2>Complete Form Below</h2>
        </div>
        <div className="form-group border-bottom mb-2 border-one d-flex">
          <input type="text" name='name' value={this.state.fName}
          className='form-control mr-2' placeholder=' First Name '  />
          <input type="text" name='name' value={this.state.lName}
            className='form-control ml-2' placeholder=' Last Name ' />
        </div>

        <div className="form-group">
          <input type="text" name='fake1' value={this.state.cc}
            className='form-control' placeholder=' CC # ' />
        </div>
        <div className="form-group">
          <input type="text" name='fake2' value={this.state.address}
            className='form-control' placeholder=' Address ' />
        </div>
        <div className="form-group">
          <input type="text" name='fake3' value={this.state.phone}
            className='form-control' placeholder=' Phone Number ' />
        </div>
        <div className="form-group border-top d-flex justify-content-end">
          <button className='btn btn-lg btn-primary mt-3'>
            Submit
          </button>
        </div>
      </form>
    )
  }



}

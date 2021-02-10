import React from 'react';

export default class Payment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        fName: '',
        lName: '',
        cc: '',
        phone: '',
        address: ''
      }
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(event){
    let user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({user});
  }
  render() {
    return (
      <form action="#" className='h-100 w-100 p-5 d-flex flex-column align-items-between'>
        <div className="form-group d-flex justify-content-center">
          <h2>Complete Form Below</h2>
        </div>
        <div className="form-group border-bottom mb-2 border-one d-flex">
          <input type="text" name='fName' value={this.state.user.fName} onChange={this.onChange}
          className='form-control mr-2' placeholder=' First Name '  />
          <input type="text" name='lName' value={this.state.user.lName} onChange={this.onChange}
            className='form-control ml-2' placeholder=' Last Name ' />
        </div>

        <div className="form-group">
          <input type="text" name='cc' value={this.state.user.cc} onChange={this.onChange}
            className='form-control' placeholder=' CC # ' />
        </div>
        <div className="form-group">
          <input type="text" name='address' value={this.state.user.address} onChange={this.onChange}
            className='form-control' placeholder=' Address ' />
        </div>
        <div className="form-group">
          <input type="text" name='phone' value={this.state.user.phone} onChange={this.onChange}
            className='form-control' placeholder=' Phone Number ' />
        </div>
        <div className="form-group border-top d-flex justify-content-end">
            <button onClick={() => { this.props.handleSubmit(this.state.user)
              window.location.href='#orders'
            }} className='btn btn-lg btn-primary mt-3'>
              Submit
          </button>
        </div>
      </form>
    )
  }



}

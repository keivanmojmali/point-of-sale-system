import React from 'react';

export default class Payment extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <form action="#" className='h-100 w-100 p-5 d-flex flex-column align-items-between'>
        <div className="form-group d-flex justify-content-center">
          <h2>Complete Form Below</h2>
        </div>
        <div className="form-group border-bottom mb-2 border-one">
          <input type="text" name='name'
          className='form-control' placeholder=' Name On Order '  />
        </div>
        <div className="form-group">
          <input type="text" name='fake1'
            className='form-control' placeholder=' CC # ' />
        </div>
        <div className="form-group">
          <input type="text" name='fake2'
            className='form-control' placeholder=' Address ' />
        </div>
        <div className="form-group">
          <input type="text" name='fake3'
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

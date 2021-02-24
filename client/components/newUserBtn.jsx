import React from 'react';

export default class NewUserBtn extends React.Component {
  handleClick() {
    localStorage.clear('itemInCart');
    fetch('/api/newUser', {
      method: 'POST'
    })
      .then(result => result.json())
      .then(data => {
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <button className='btn btn-lg btn-primary' onSubmit={this.handleClick}>
        Get Started
      </button>
    );
  }
}

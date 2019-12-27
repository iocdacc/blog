import React, { Component } from 'react';
import logoImg from 'assets/images/logo.png'
import MenuList from 'components/MenuList'

class Head extends Component {
  render() {
    return (
      <div className={'g-main g-mainHead clear'}>
        <div className="m-logo">
          <img alt=""
              src={logoImg}
          />
        </div>
        <div className="m-title">
          <h1 className="title">Iocdacc</h1>
          <div></div>
        </div>
        <MenuList />
      </div>
    );
  }
}

export default Head;

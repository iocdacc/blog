import React, { Component } from 'react';
import logoImg from 'assets/images/logo.png';
import MenuList from 'components/MenuList';

class Head extends Component {
  constructor(props) {
    super(props);
    this.title = 'Iocdacc'
  }

  render() {
    return (
      <div className={'g-main g-mainHead clear'}>
        <div className="m-logo">
          <img alt="" src={logoImg} />
        </div>
        <div className="m-title">
          <h1 className="title">{!this.props.title ? this.title : this.props.title}</h1>
          <div></div>
        </div>
        <MenuList />
      </div>
    );
  }
}

export default Head;

import React, { Component } from 'react';
import MenuList from 'components/MenuList';

class Foot extends Component {
  constructor(){
    super()
  }

  topa(){
    if (window.pageYOffset > 0) {
      document.getElementsByTagName('html')[0].scrollIntoView()
    }else{
      document.getElementById('foot').scrollIntoView()
    }
  }

  render() {
    return (
      <div className={(this.props.className || 'g-main') + ' g-mainFoot clear'} id="foot">
        <MenuList classType="m-menuFoot" />

        <div className="m-top m-icon m-icon-top" onClick={this.topa}>&#xe61f;</div>
      </div>
    );
  }
}

export default Foot;

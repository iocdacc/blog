import React, { Component } from 'react';
import MenuList from 'components/MenuList';

class Foot extends Component {
  render() {
    return (
      <div className="g-main g-mainFoot clear">
        <MenuList classType="m-menuFoot" />
      </div>
    );
  }
}

export default Foot;

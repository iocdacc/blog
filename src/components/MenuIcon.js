import React, { Component } from 'react';
import MenuList from 'components/MenuList';

class MenuIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listShow: true
    };
  }

  setListShow(){
    this.setState({
      listShow: !this.state.listShow ? true : false
    });
  }

  render() {
    return (
      <div>
        <i className="m-icon m-icon-menu"
            onClick={this.setListShow.bind(this)}
        ></i>
        {!this.state.listShow ? '' : <MenuList classType="m-menuIcon" />}
      </div>
    );
  }
}

export default MenuIcon;
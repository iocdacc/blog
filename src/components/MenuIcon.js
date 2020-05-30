import React, { Component } from 'react';
import MenuList from 'components/MenuList';

class MenuIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listShow: true,
      h2: []
    };
  }

  componentDidUpdate() {
    let h2Array = [...document.querySelectorAll('h2')];
    let h2 = h2Array.map((h2, index) => {
      return (<li className={h2.localName} key={index}>
        <a href="#" onClick={this.scrollToAnchor.bind(this, h2.getAttribute('id'))}>
          {h2.textContent}
        </a>
      </li>);
    });

    JSON.stringify(this.state.h2) !== JSON.stringify(h2) && this.setState({ h2: h2 });
  }

  setListShow() {
    this.setState({
      listShow: !this.state.listShow ? true : false
    });
  }

  scrollToAnchor(anchorId, e) {
    e.preventDefault();
    if (anchorId) {
      // 找到锚点 id
      let anchorElement = document.getElementById(anchorId);
      if (anchorElement) {
        // 如果对应id的锚点存在，就跳转到锚点
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  }

  render() {
    return (
      <div>
        <i className="m-icon m-icon-menu" onClick={this.setListShow.bind(this)}></i>
        {!this.state.listShow ? '' : <MenuList classType="m-menuIcon" />}
        <div className="m-abstract">
          <ul>{this.state.h2}</ul>
        </div>
      </div>
    );
  }
}

export default MenuIcon;

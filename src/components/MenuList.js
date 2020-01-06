import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuList extends Component {
  render() {
    return (
      /* this.props.classType: m-menu 菜单公共样式 */
      /* this.props.classType: m-menuFoot 尾部灰色的菜单 */
      <div className={'m-menu ' + this.props.classType}>
        <ul className="clear">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/archives">Archives</Link>
          </li>
          <li>
            <Link to="/snippet">Snippet</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/">Github</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default MenuList;

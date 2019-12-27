import React, { Component } from 'react';
import Content from 'components/Content';

class Archive extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="g-main">
        <div className="m-article">
          <h1 className="title">持续集成 - 使用Gilab CI进行前端项目的持续集成</h1>
          <div className="info">
            <span>2019-09-20</span>
            <span>495</span>
            <span>持续集成</span>
          </div>
          <Content />
        </div>
      </div>
    );
  }
}

export default Archive;

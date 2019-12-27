import React, { Component } from 'react';
import ArchiveList from 'components/ArchiveList'
import ProjectsList from 'components/ProjectsList'


class Home extends Component {
  render() {
    return (
      <div className="g-main">
        <div className="m-title m-titleList">
            <span className="title"><a href="">Archives</a></span>
        </div>
        <ArchiveList />
        <div className="m-title m-titleList">
            <span className="title"><a href="">Projects</a></span>
        </div>
        <ProjectsList />
      </div>
    );
  }
}

export default Home;
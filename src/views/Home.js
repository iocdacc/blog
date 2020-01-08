import React, { Component } from 'react';
import ArchiveList from 'components/ArchiveList';
import ProjectsList from 'components/ProjectsList';
import ShowText from 'components/ShowText';
console.log(process);
class Home extends Component {

  render() {
    return (
      <div className="g-main">
        <ShowText />
        <div className="m-counting">
          <ul className="clear">
            <li>
              <i className="m-icon m-icon-eye"></i>
              <span>555555</span>
            </li>
            <li>
              Find me on <i className="m-icon m-icon-github"></i>.
            </li>
          </ul>
        </div>
        <div className="m-title m-titleList">
          <span className="title">
            <a href="/">Archives</a>
          </span>
        </div>
        <ArchiveList page={12} />
        <div className="m-title m-titleList">
          <span className="title">
            <a href="/">Projects</a>
          </span>
        </div>
        <ProjectsList />
      </div>
    );
  }
}

export default Home;

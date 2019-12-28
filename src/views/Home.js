import React, { Component } from 'react';
import ArchiveList from 'components/ArchiveList';
import ProjectsList from 'components/ProjectsList';
import ShowText from 'components/ShowText';
import Axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      archiveListData: ''
    };
  }

  componentDidMount() {
    Axios.get('/md/pages.json').then(res => {
      this.setState({
        archiveListData: res.data
      });
    });
  }

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
            <a href="">Archives</a>
          </span>
        </div>
        <ArchiveList data={this.state.archiveListData} />
        <div className="m-title m-titleList">
          <span className="title">
            <a href="">Projects</a>
          </span>
        </div>
        <ProjectsList />
      </div>
    );
  }
}

export default Home;

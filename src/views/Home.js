import React, { Component } from 'react';
import ArchiveList from 'components/ArchiveList';
import ProjectsList from 'components/ProjectsList';
import ShowText from 'components/ShowText';
import store from 'store';
import { archivesList } from 'store/actionCreators';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archivesListData: store.getState().archivesListData
    };
  }

  componentDidMount() {
    let that = this;
    store.dispatch(archivesList(store.getState().archivesListData));
    this.unsubscribe = store.subscribe(() => that.setState({ archivesListData: store.getState().archivesListData }));
  }

  componentWillUnmount() {
    this.unsubscribe();
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
        <ArchiveList data={this.state.archivesListData} />
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

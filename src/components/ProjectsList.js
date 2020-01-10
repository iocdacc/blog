import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects } from 'store/actionCreators';

class ProjectsList extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    let list = [];
    if (this.props.projectsData) {
      this.props.projectsData.forEach(k => {
        list.push(
          <li key={k.name}>
            <span className="title">
              <a href={k.src} rel="noopener noreferrer" target="_blank">{k.name}</a>:
            </span>
            <span className="explain">{k.describe}</span>
          </li>
        );
      });
    }

    return (
      <div className="m-list m-list2 clear">
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectsData: state.projectsData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => {
      dispatch(getProjects());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);

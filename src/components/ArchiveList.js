import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class archiveList extends Component {
  render() {
    let list = [];
    let i = 0;
    if (this.props.archivesListData) {
      for (const key in this.props.archivesListData) {
        let res = this.props.archivesListData[key];
        if (!res.hidden) {
          if (res.tag === this.props.match.params.tag || !this.props.match.params.tag) {
            if (i >= this.props.page && this.props.page) break;
            i++;

            list.push(
              <li key={key}>
                <span className="date">{res.date}</span>
                <span className="title">
                  <Link to={'/archive/' + key}>{res.title}</Link>
                </span>
              </li>
            );
          }
        }
      }
    }

    return (
      <div className="m-list clear">
        <ul>{list}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    archivesListData: state.archivesListData
  };
};

export default connect(mapStateToProps)(withRouter(archiveList));

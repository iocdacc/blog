import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class archiveList extends Component {
  render() {
    let list = [];
    let i = 0;

    if (this.props.archivesListData) {
      let archivesListDataKey = Object.keys(this.props.archivesListData);
      archivesListDataKey.sort((k1, k2)=>{
        k1 = k1.slice(0, 10).replace(/-/g, '');
        k2 = k2.slice(0, 10).replace(/-/g, '');

        if (k1 > k2) return -1;
        if (k1 == k2) return 0;
        if (k1 < k2) return 1;
      });

      archivesListDataKey.forEach((v, key)=>{
        let res = this.props.archivesListData[v];
        if (!res.hidden) {
          if (Array.isArray(res.tag)) {
            let show = false;
            res.tag.forEach((item) => {
              if (item === this.props.match.params.tag || !this.props.match.params.tag) {
                if (i >= this.props.page && this.props.page) return;
                show = true;
              }

            });
            if (show) {
              i++;
              list.push(
                <li key={key}>
                  <span className="date">{res.date}</span>
                  <span className="title">
                    <Link to={'/archive/' + v}>{res.title}</Link>
                  </span>
                </li>
              );
            }
          } else {
            if (res.tag === this.props.match.params.tag || !this.props.match.params.tag) {
              if (i >= this.props.page && this.props.page) return;
              i++;

              list.push(
                <li key={key}>
                  <span className="date">{res.date}</span>
                  <span className="title">
                    <Link to={'/archive/' + v}>{res.title}</Link>
                  </span>
                </li>
              );
            }
          }
        }
      });
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

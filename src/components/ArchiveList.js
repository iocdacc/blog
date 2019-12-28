import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class archiveList extends Component {
  render() {
    let list = [];
    if (this.props.data) {
      for (const key in this.props.data) {
        let res = this.props.data[key];
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

    return (
      <div className="m-list clear">
        <ul>{list}</ul>
      </div>
    );
  }
}

export default archiveList;

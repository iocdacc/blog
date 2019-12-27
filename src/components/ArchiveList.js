import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'


class archiveList extends Component {
  render() {
    return (
      <div className="m-list clear">
        <ul>
          <li>
            <span className="date">2019-10-09</span>
            <span className="title">
              <Link to="archive/1">Systemd Linux管理工具（守护进程，开机自启动）</Link>
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

export default archiveList;

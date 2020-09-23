import React, { Component } from 'react';
import Tag from 'components/Tag';
import ArchiveList from 'components/ArchiveList';

class Archives extends Component {
  render() {
    document.title = 'iocdacc - Archives';
    return (
      <div>
        <div className="g-main">
          <Tag />
          {/* <div className="m-title m-titleArchives">
            <span className="title">
              <a href="">2019</a>
            </span>
          </div> */}
          <ArchiveList />
        </div>
      </div>
    );
  }
}

export default Archives;

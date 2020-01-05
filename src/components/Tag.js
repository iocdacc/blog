import React, { Component } from 'react';
import { connect } from 'react-redux';

class Tag extends Component {
  render() {

    //通过文章列表信息读取并重组标签
    let tagData = {};
    let v = this.props.archivesListData;
      for (const key in v) {
        tagData[v[key].tag] ? (tagData[v[key].tag] += 1) : (tagData[v[key].tag] = 1);
      }
    let TagList = [];
    for (const key in tagData) {
      TagList.push(
        <li className={'level' + tagData[key]} key={key}>{key}</li>
      );
    }

    return (
      <div className="m-tag clear">
        <ul>
          {TagList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    archivesListData: state.archivesListData
  };
};

export default connect(mapStateToProps)(Tag);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Tag extends Component {
  render() {
    //通过文章列表信息读取并重组标签
    let tagData = {};
    let v = this.props.archivesListData;
    for (const key in v) {
      if (!v[key].hidden) {
        if (Array.isArray(v[key].tag)) {
          v[key].tag.forEach((item)=>{
            tagData[item] ? (tagData[item] += 1) : (tagData[item] = 1);
            tagData[item] > 7 && (tagData[item] = 7);
          });
        }else if (typeof v[key].tag == 'string') {
          tagData[v[key].tag] ? (tagData[v[key].tag] += 1) : (tagData[v[key].tag] = 1);
          tagData[v[key].tag] > 7 && (tagData[v[key].tag] = 7);
        }
      }
    }
    let TagList = [];
    for (const key in tagData) {
      TagList.push(
        <li className={'level' + tagData[key]} key={key}>
          <Link to={'/archives/'+key}>{key}</Link>
        </li>
      );
    }

    return (
      <div className="m-tag clear">
        <ul>{TagList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    archivesListData: state.archivesListData
  };
};

export default connect(mapStateToProps)(Tag);

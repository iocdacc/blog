import React, { Component } from 'react';
import Content from 'components/Content';
import MenuIcon from 'components/MenuIcon';
import { connect } from 'react-redux';
import { archiveContent } from 'store/actionCreators';
import { withRouter } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

let titleLoader = (
  <ContentLoader height={'18'} primaryColor={'#1d1f21'} secondaryColor={'#272727'}>
    <rect height="18" rx="0" ry="0" width="100%" x="0" y="0" />
  </ContentLoader>
);

let infoLoader = (
  <ContentLoader height={'18'} primaryColor={'#1d1f21'} secondaryColor={'#272727'}>
    <rect height="12" rx="0" ry="0" width="50" x="0" y="0" />
    <rect height="12" rx="0" ry="0" width="50" x="60" y="0" />
    <rect height="12" rx="0" ry="0" width="50" x="120" y="0" />
  </ContentLoader>
);

class Archive extends Component {
  componentDidMount() {
    this.props.archiveContent(this.props.match.params.id);
  }

  render() {
    if (this.props.archivesListData && this.props.archivesListData[this.props.match.params.id].contentData) {
      return (
        <div>
          <div className="g-main">
            <div className="m-article">
              <h1 className="title">{this.props.archivesListData[this.props.match.params.id].title}</h1>
              <div className="info">
                <span>{this.props.archivesListData[this.props.match.params.id].date}</span>
                <span>495</span>
                <span>{this.props.archivesListData[this.props.match.params.id].tag}</span>
              </div>
              <Content data={this.props.archivesListData[this.props.match.params.id].contentData} />
            </div>
          </div>
          <div className="g-topRightFixed">
            <MenuIcon />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="g-main">
            <div className="m-article">
              <h1 className="title">{titleLoader}</h1>
              <div className="info">
                {infoLoader}
              </div>
              <div className="content">
                <Content data="" />
              </div>
            </div>
          </div>
          <div className="g-topRightFixed">
            <MenuIcon />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    archivesListData: state.archivesListData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    archiveContent: id => {
      dispatch(archiveContent(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Archive));

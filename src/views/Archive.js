import React, { Component } from 'react';
import Content from 'components/Content';
import MenuIcon from 'components/MenuIcon';
import { connect } from 'react-redux';
import { archiveContent } from 'store/actionCreators';
import ContentLoader from 'react-content-loader';
import Comments from 'components/Comments';
import { withRouter, Link } from 'react-router-dom';
import { fetch } from 'busuanzi.pure.js';

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
    fetch();
    this.props.archiveContent(this.props.match.params.id);
  }

  componentDidUpdate(prevState){
    JSON.stringify(this.props.match.params) !== JSON.stringify(prevState.match.params) && this.props.archiveContent(this.props.match.params.id);
  }

  render() {
    if (this.props.archivesListData && this.props.archivesListData[this.props.match.params.id] && this.props.archivesListData[this.props.match.params.id].contentData) {
      return (
        <div>
          <div className="g-main">
            <div className="m-article">
              <h1 className="title">{this.props.archivesListData[this.props.match.params.id].title}</h1>
              <div className="info">
                <span>{this.props.archivesListData[this.props.match.params.id].date}</span>
                <span><i className="m-icon m-icon-eye"></i><span id="busuanzi_value_page_pv">0</span></span>
                <Link to={'/archives/'+this.props.archivesListData[this.props.match.params.id].tag}><span><i className="m-icon m-icon-label"></i>{this.props.archivesListData[this.props.match.params.id].tag}</span></Link>
              </div>
              <Content data={this.props.archivesListData[this.props.match.params.id].contentData}/>
            </div>
            <Comments id={this.props.match.params.id} url={this.props.match.url} />
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
              <Content data=""/>
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

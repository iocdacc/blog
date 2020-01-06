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
  constructor(props) {
    super(props);
    this.state = {
      aaa: 1
    };
  }

  componentDidMount() {
    this.props.archiveContent(this.props.match.params.id);
  }

  componentDidUpdate(prevState){
    /**
     * 这个页面在仅修改get参数时不会重新渲染，因为URL没有改变
     * 导致通过修改get参数显示的还是原来的文章，
     * 正常情况在组件上设置动态KEY就能解决
     * 但第一层组件没有找到定义动态KEY的方法，
     * 只能在这里修改state来重新渲染组件，
     * 但在更新阶段修改state有风险（可能导致死循环，修改state之后又会触发componentDidUpdate这个生命周期），
     * 暂未找到更好的办法。
     * 最好不要在第一层页面取数据，这里主要是因为没有数据库，如果放组件里取会重复发很多AJAX
     */
    JSON.stringify(this.props.match.params) !== JSON.stringify(prevState.match.params) && this.props.archiveContent(this.props.match.params.id);
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
              <Content data={this.props.archivesListData[this.props.match.params.id].contentData}/>
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

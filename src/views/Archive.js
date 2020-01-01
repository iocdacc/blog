import React, { Component } from 'react';
import Content from 'components/Content';
import MenuIcon from 'components/MenuIcon';
import { withRouter } from 'react-router-dom';
import store from 'store';
import { archiveContent } from 'store/actionCreators';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentData: '',
      date: '',
      tag: '',
      title: ''
    };
  }

  componentDidMount() {
    let that = this;
    //this.props.match.params.id 为文章的id url带过来的
    //这个action里有两层AJAX 第一层拿目录 第二层通过目录里SRC拿对应的文章内容 当然如果之前已经拿了目录会直接拿文章内容
    store.dispatch(archiveContent(this.props.match.params.id));
    this.unsubscribe = store.subscribe(() => {
      that.setState({
        contentData: store.getState().archiveContentData.contentData,
        date: store.getState().archivesListData[this.props.match.params.id].date,
        tag: store.getState().archivesListData[this.props.match.params.id].tag,
        title: store.getState().archivesListData[this.props.match.params.id].title
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <div className="g-main">
          <div className="m-article">
            <h1 className="title">{this.state.title}</h1>
            <div className="info">
              <span>{this.state.date}</span>
              <span>495</span>
              <span>{this.state.tag}</span>
            </div>
            <Content data={this.state.contentData} />
          </div>
        </div>
        <div className="g-topRightFixed">
          <MenuIcon />
        </div>
      </div>
    );
  }
}

export default withRouter(Archive);

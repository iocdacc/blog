import React, { Component } from 'react';
import Content from 'components/Content';
import { connect } from 'react-redux';
import { archiveContent } from 'store/actionCreators';
import { withRouter } from 'react-router-dom';

class About extends Component {
  constructor(props) {
    super(props);
    switch (this.props.match.path) {
      case '/snippet':
        this.state = {id: 'snippet'};
        break;

      default:
        this.state = {id: 'about'};
        break;
    }
  }

  componentDidMount() {
    this.props.archiveContent(this.state.id);
  }

  render() {
    if (this.props.archivesListData && this.props.archivesListData[this.state.id].contentData) {
      let that = this;
      window.disqus_config = function () {
        this.page.url = 'https://iocdacc.com'+that.props.match.url;
        this.page.identifier = that.state.id;
      };
      let d = document, s = d.createElement('script');
      s.src = 'https://iocdacc.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);


      return (
        <div>
          <div className="g-main">
            <div className="m-article">
              <Content data={this.props.archivesListData[this.state.id].contentData} />
            </div>
            <div id="disqus_thread"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="g-main">
            <div className="m-article">
              <div className="content">
                <Content data="" />
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(About));

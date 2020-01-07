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
      return (
        <div>
          <div className="g-main">
            <div className="m-article">
              <Content data={this.props.archivesListData[this.state.id].contentData} />
            </div>
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

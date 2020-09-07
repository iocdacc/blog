import React, { Component } from 'react';
import Prism from 'prismjs';
import Marked from 'marked';
import RandQuestion from './RandQuestion';
// import ContentLoader from 'react-content-loader';

// let textLoader = (
//   <ContentLoader height={'350'} primaryColor={'#1d1f21'} secondaryColor={'#272727'}>
//     <rect height="350" rx="0" ry="0" width="100%" x="0" y="0" />
//   </ContentLoader>
// );

class Content extends Component {
  componentDidMount() {
    for (let index = 0; index < document.getElementsByTagName('pre').length; index++) {
      document.getElementsByTagName('pre')[index].className = 'line-numbers';
    }
    Prism.highlightAll();
  }

  componentDidUpdate() {
    for (let index = 0; index < document.getElementsByTagName('pre').length; index++) {
      document.getElementsByTagName('pre')[index].className = 'line-numbers';
    }
    Prism.highlightAll();
  }

  render() {
    return (
      <>
        <div className="content">
          {this.props.option === 'RandQuestion' ? <RandQuestion /> : ''}
          {this.props.data ? <div dangerouslySetInnerHTML={{ __html: Marked(this.props.data) }}></div> : ''}
        </div>
      </>
    );
  }
}

export default Content;

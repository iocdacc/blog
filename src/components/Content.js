import React, { Component } from 'react';
import Prism from 'prismjs';
import Marked from 'marked';

class Content extends Component {
  componentDidUpdate(){
    for (let index = 0; index < document.getElementsByTagName('pre').length; index++) {
      document.getElementsByTagName('pre')[index].className = 'line-numbers';
    }
    Prism.highlightAll();
  }

  render() {
    return (
      <div>
        <div className="content">
          <div dangerouslySetInnerHTML={{__html: Marked(this.props.data)}}></div>
        </div>
      </div>
    );
  }
}

export default Content;

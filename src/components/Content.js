import React, { Component } from 'react';
import Prism from 'prismjs';
import Marked from 'marked'
import Axios from 'axios'


class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ''
    }

    let that = this
    Axios.get('/md/aa.md').then(function (res){
      that.setState({
        data: Marked(res.data)
      })
      for (let index = 0; index < document.getElementsByTagName('pre').length; index++) {
        document.getElementsByTagName('pre')[index].className = 'line-numbers'
        document.getElementsByTagName('pre')[index].style.whiteSpace = 'pre-line'
      }
      Prism.highlightAll()
    })
  }

  render() {
    return (
      <div>
        <div className="content">
          <div dangerouslySetInnerHTML={{__html: this.state.data}}></div>
        </div>
      </div>
    );
  }
}

export default Content;

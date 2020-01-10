import React, { Component } from 'react';

class Comments extends Component {
  componentDidMount(){
    !window.DISQUS ? this.disqus() : this.resetDisqus();
  }

  componentDidUpdate(prevState){
    if (this.props.url !== prevState.url && this.props.id !== prevState.id) {
      !window.DISQUS ? this.disqus() : this.resetDisqus();
    }
  }

  disqus(){
    let that = this;
    window.disqus_config = function () {
      this.page.url = that.props.url;
      this.page.identifier = that.props.id;
    };
    let d = document, s = d.createElement('script');
    s.src = 'https://iocdacc.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }

  resetDisqus(){
    if (window.DISQUS) {
      let that = this;
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = that.props.url;
          this.page.identifier = that.props.id;
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div id="disqus_thread"></div>
      </div>
    );
  }
}

export default Comments;

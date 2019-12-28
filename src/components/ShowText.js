import React, { Component } from 'react';
import Typed from 'typed.js';

class ShowText extends Component {
  componentDidMount(){
    new Typed('.m-showText span', {
      strings: ['First sentence.', 'Second sentence.'],
      typeSpeed: 30
    })
  }

  render() {
    return (
      <div className="m-showText">
        <span></span>
      </div>
    )
  }
}

export default ShowText;

import React, { Component } from 'react';
import _ from 'lodash';

class RandQuestion extends Component {
  constructor(){
    super();
    this.state = {
      list: []
    };
  }

  question(){
    let h3 = [...document.getElementsByTagName('h3')];
    let list = [];
    for (let index = 0; index < 5; index++) {
      list.push(<h3 key={index}>{h3[_.random(0, h3.length - 1)].textContent}</h3>);
    }

    this.setState({list});
  }

  render() {
    return (
      <>
        <button onClick={this.question.bind(this)}>随机出题</button>
        {this.state.list}
      </>
    );
  }
}

export default RandQuestion;

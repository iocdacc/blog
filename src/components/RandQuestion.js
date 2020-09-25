import React, { Component } from 'react';
import _ from 'lodash';

class RandQuestion extends Component {
  constructor(){
    super();
    this.state = {
      list: []
    };

  }

  componentDidMount(){

    this.h3 = [...document.getElementsByTagName('h3')]

    this.h3.forEach((e, k)=>{
      e.innerText = '问题' + (k + 1) + ' ' + e.innerText
    })
  }

  question(){
    let list = [];
    for (let index = 0; index < 5; index++) {
      let key = _.random(0, this.h3.length - 1)

      list.push(
        <>
          <h3 key={key}>
            {this.h3[key].textContent + '\u0020'}
            <button onClick={()=>{this.h3[key].scrollIntoView()}}>答案</button>
          </h3>
        </>
      );
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typed from 'typed.js';
import { getShanbayDay } from 'store/actionCreators';

class ShowText extends Component {
  componentDidMount() {
    this.props.changShanbayDay();
    this.props.shanbayDayData.content && this.ShowText(this.props.shanbayDayData);
  }

  shouldComponentUpdate(nextProps){
    return (JSON.stringify(this.props) == JSON.stringify(nextProps)) ? false : true;
  }

  componentDidUpdate() {
    this.props.shanbayDayData.content && this.ShowText(this.props.shanbayDayData);
  }

  ShowText(data) {
    if (!this.Typed) {
      let str = data.content + '<br/>';
      str += data.translation + '<br/>';
      this.Typed = new Typed('.m-showText span', {
        strings: [str + '--- Who??^1000', str + '--- It\'s me^2000', str + '--- Haha, make a joke', str + '--- ' + data.author],
        typeSpeed: 20,
        startDelay: 300
      });
    }
  }

  render() {
    return (
      <div className="m-showText">
        <span></span>
      </div>
    );
  }
}

const mapState = state => ({
  shanbayDayData: state.shanbayDayData
});

const mapDispatch = dispatch => ({
  changShanbayDay() {
    dispatch(getShanbayDay());
  }
});

export default connect(mapState, mapDispatch)(ShowText);

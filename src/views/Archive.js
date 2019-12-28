import React, { Component } from 'react';
import Content from 'components/Content';
import MenuIcon from 'components/MenuIcon';
import Axios from 'axios';


class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContentData: '',
      date: '',
      tag: '',
      title: ''
    };
  }

  componentDidMount(){
    let that = this;
    Axios.get('/md/pages.json').then(res=>{
      this.setState({
        date: res.data[that.props.match.params.id].date,
        tag: res.data[that.props.match.params.id].tag,
        title: res.data[that.props.match.params.id].title
      });
      Axios.get(res.data[that.props.match.params.id].src).then(res=>{
        this.setState({
          ContentData: res.data
        });
      });
    });
  }

  render() {
    return (
      <div>
        <div className="g-main">
          <div className="m-article">
            <h1 className="title">{this.state.title}</h1>
            <div className="info">
              <span>{this.state.date}</span>
              <span>495</span>
              <span>{this.state.tag}</span>
            </div>
            <Content data={this.state.ContentData} />
          </div>
        </div>
        <div className="g-topRightFixed">
          <MenuIcon />
        </div>
      </div>
    );
  }

}

export default Archive;

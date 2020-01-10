import React, { Component } from 'react';
import ArchiveList from 'components/ArchiveList';
import ProjectsList from 'components/ProjectsList';
import ShowText from 'components/ShowText';
import { Link } from 'react-router-dom';
import 'busuanzi.pure.js';
let busuanzi_value_site_pv = 0;

class Home extends Component {
  componentDidMount(){
    document.getElementById('busuanzi_value_site_pv').addEventListener('DOMNodeInserted',(e)=>{
      busuanzi_value_site_pv = e.srcElement.textContent;
    });
  }

  render() {
    return (
      <div className="g-main">
        <ShowText />
        <div className="m-counting">
          <ul className="clear">
            <li>
              <i className="m-icon m-icon-eye"></i>
              <span id="busuanzi_value_site_pv">{busuanzi_value_site_pv}</span>
            </li>
            <li>
              Find me on{' '}
              <a href="https://github.com/iocdacc">
                <i className="m-icon m-icon-github"></i>
              </a>
              .
            </li>
          </ul>
        </div>
        <div className="m-title m-titleList">
          <span className="title">
            <Link to="/Archives">Archives</Link>
          </span>
        </div>
        <ArchiveList page={12} />
        <div className="m-title m-titleList">
          <span className="title">
            <Link to="/">Projects</Link>
          </span>
        </div>
        <ProjectsList />
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from 'store';
import { archivesList } from 'store/actionCreators';
/**
 * @description: 全局样式
 * @return:
 */
import 'assets/css/reset.css';
import 'assets/css/style.css';
/**
 * @description: 路由组件
 * @return: 标准React组件
 */
import Home from 'views/Home';
import Archive from 'views/Archive';
import Archives from 'views/Archives';
import About from 'views/About';
import Head from 'components/Head';
import Foot from 'components/Foot';

//文章列表包含了整个博客的核心数据所以初始化时就读取
store.dispatch(archivesList(store.getState().archivesListData));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/"><Head/><Home/></Route>
            <Route exact path="/archive/:id"><Archive /></Route>
            <Route exact path="/archives/:tag"><Head title="Archives" /><Archives/></Route>
            <Route exact path="/archives"><Head title="Archives" /><Archives/></Route>
            <Route exact path="/snippet"><Head title="Snippet" /><About key="snippet" /></Route>
            <Route exact path="/about"><Head title="About" /><About key="about" /></Route>
            <Route>404</Route>
          </Switch>
          <Foot />
        </Router>
      </Provider>
    );
  }
}

console.log(
  '\n%c Email:%ciocdacc@gmail.com \n%c wechat:%cxp50021 \n',
  'color: #fff;background-image: linear-gradient(90deg, rgb(47, 172, 178) 0%, rgb(45, 190, 96) 100%);padding:5px 1px;',
  'color: #fff;background-image: linear-gradient(90deg, rgb(45, 190, 96) 0%, rgb(255, 190, 96) 100%);padding:5px 0;width: 200px;display: inline-block;',
  'color: #fff;background-image: linear-gradient(90deg, rgb(47, 172, 178) 0%, rgb(45, 190, 96) 100%);padding:5px 1px;',
  'color: #fff;background-image: linear-gradient(90deg, rgb(45, 190, 96) 0%, rgb(255, 190, 96) 100%);padding:5px 0;width: 200px;display: inline-block;'
);
ReactDOM.render(<App />, document.getElementById('root'));
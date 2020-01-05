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
            <Route exact path="/archive/:id"><Archive/></Route>
            <Route exact path="/archives"><Head title="Archives" /><Archives/></Route>
            <Route exact path="/about"><Head title="About" /><About/></Route>
            <Route>404</Route>
          </Switch>
          <Foot />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

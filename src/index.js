import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import Head from 'components/Head';
import Foot from 'components/Foot';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact
              path="/"
          >
            <Head />
            <Home />
          </Route>

          <Route
              path="/archive/:id"
          >
            <Archive />
          </Route>

          <Route>
            404
          </Route>
        </Switch>

        <Foot />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

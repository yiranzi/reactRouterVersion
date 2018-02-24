import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import init from "./wx/init";

// 路由
import Test from './pages/test'
import Home from './pages/home'
// 商业英语
import Main from './pages/abilitycollege/main'

let AppRouter = class AppRouter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      finish: true
    }
  }

  componentWillMount = async () => {
    await init()
    this.setState({
      finish: true
    })
  }

  render() {
    if (this.state.finish) {
      return (<Router>
        <div>
          <li>
            <Link to="/">1Home</Link>
          </li>
          <li>
            <Link to="/pages/test">2test</Link>
          </li>

          {/*<Switch>*/}
          <Route exact path="/" component={Home} />
          <Route path="/pages/test" component={Test} />
          {/*<Route path="/about" component={About} />*/}
          {/*<Route path="/topics" component={Topics} />*/}
          {/*</Switch>*/}
        </div>
      </Router>)
    } else {
      return (<div>123</div>)
    }
  }
};


export default AppRouter;
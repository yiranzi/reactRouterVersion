import React from "react";
import { HashRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import init from "./wx/init";
import Home from './pages/home'
import Matchless from './pages/matchless'

// 商业英语
import Summary from './pages/businessReading/summary'
import Guide from './pages/businessReading/guide'
import Keywords from './pages/businessReading/keywords'
import Analysis from './pages/businessReading/analysis'
import Knowledge from './pages/businessReading/knowledge'
import Finish from './pages/businessReading/finish'
import BusinessTest from './pages/businessReading/test'
import BusinessMine from './pages/businessReading/mine'
import BusinessLessonList from './pages/businessReading/lessonlist'
import BusinessKnowledgeList from './pages/businessReading/knowledgelist'
// import BusinessKnowledge from './pages/businessReading/sourcelist'
// 课程首页
import Main from './pages/abilitycollege/main'

// 支付
import PaymentBuygether from './pages/payment/buygether'

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
      return (<HashRouter>
        <div>
          {/*<li>*/}
            {/*<Link to="/">1Home</Link>*/}
          {/*</li>*/}
          {/*<li>*/}
            {/*<Link to="/pages/test">2test</Link>*/}
          {/*</li>*/}
          {/*<li>*/}
            {/*<Link to="/pages/abilitycollege/main">3main</Link>*/}
          {/*</li>*/}
          {/*<li>*/}
            {/*<Link to="/pages/businessReading/summary">4Summary</Link>*/}
          {/*</li>*/}
          <Switch>
            {/*<Route exact path="/" component={Home} />*/}
            {/*<Route path="/pages/test" component={Test} />*/}
            <Route path="/pages/abilitycollege/main" component={Main} />
            <Route path="/pages/businessReading/summary" component={Summary} />
            <Route path="/pages/businessReading/guide/:stageId/:lessonId" component={Guide} />
            <Route path="/pages/businessReading/guide/:stageId" component={Guide} />
            <Route path="/pages/businessReading/keywords/:stageId/:lessonId" component={Keywords} />
            <Route path="/pages/businessReading/analysis/:stageId/:lessonId" component={Analysis} />
            <Route path="/pages/businessReading/knowledge/:stageId/:lessonId" component={Knowledge} />
            <Route path="/pages/businessReading/finish/:stageId/:lessonId" component={Finish} />
            <Route path="/pages/businessReading/test/:stageId/:lessonId" component={BusinessTest} />
            <Route path="/pages/businessReading/mine/:stageId" component={BusinessMine} />
            <Route path="/pages/businessReading/lessonlist/:stageId" component={BusinessLessonList} />
            <Route path="/pages/businessReading/knowledgelist/:stageId" component={BusinessKnowledge} />

            <Route path="/pages/payment/buygether/:courseId" component={PaymentBuygether} />
            <Redirect exact from="/pages/payment/buygether" to={window.__wxjs_environment === 'miniprogram' ? "/pages/abilitycollege/mainx" : "/pages/abilitycollege/main"} />
            <Route component={Matchless}/>
            {/*<Redirect exact from="/" to="/home" />*/}
            {/*<Route exact path="/home" component={Home} />*/}
            {/*<Route path="/pages/businessReading/knowledgelist/:stageId" component={BusinessList} />*/}
          </Switch>
        </div>
      </HashRouter>)
    } else {
      return (<div className='loading-icon'>
        <img src='/static/img/components/loading_icon.png' />
        <style jsx>{`
          .loading-icon {
            text-align: center;
          }
          .loading-icon img {
            width: 2rem;
            animation: circle 1s infinite linear;
          }
          @keyframes circle {
            0%{ transform:rotate(0deg); }
            100%{ transform:rotate(-360deg); }
          }
        `}</style>
      </div>)
    }
  }
};


export default AppRouter;
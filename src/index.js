import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
// document.cookie = 'SESSION' + '=' + '5a1fb85b-aab6-435d-b2bf-7373bd0a9197'




ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

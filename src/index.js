import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
// document.cookie = 'SESSION' + '=' + 'db8b3e21-1c7b-4a05-8d3f-c5d8c118719e'




ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

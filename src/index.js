import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import PageTempo from './page/filePicker/pagetemporairepourfilepicker';

ReactDOM.render(
  <React.StrictMode>
    <PageTempo />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);

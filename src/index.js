import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';

// includes reset.css
import './index.css';

ReactDOM.render(
<MuiThemeProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "@arco-design/web-react";
import enUS from '@arco-design/web-react/es/locale/en-US';
import "@arco-design/web-react/dist/css/arco.css";
import { store } from './redux/store';
import { Provider } from 'react-redux'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider locale={enUS}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import reduxStore from './redux';
// Bao app bằng BrowserRouter để sử dụng được các component của react-router-dom
import {BrowserRouter} from "react-router-dom";
import { HelmetComponent } from 'components';
import logo from 'assets/images/logo.png';
import {  HelmetProvider } from 'react-helmet-async';
const { store, persistor } = reduxStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      {/* <HelmetComponent
        title="AudioBay - Thư Viện Nhạc Miễn Phí"
        description="Nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."
        imageUrl={logo}
        imageAlt="AudioBay - Thư Viện Nhạc Miễn Phí Không Bản Quyền"
        href="https://audiobay.net"
      /> */}
      <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </HelmetProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

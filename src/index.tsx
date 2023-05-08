import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist'
import Navigation from './components/Navigation/Navigation';
import Employeeprofilehr from './components/organisms/Employeeprofile/Employeeprofilehr';
import Employeeprofileadmin from './components/organisms/Employeeprofile/Employeeprofileadmin';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let persistor=persistStore(store)
root.render(
 <React.StrictMode>
 <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
<Navigation/>
</PersistGate>
 </Provider>
 </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
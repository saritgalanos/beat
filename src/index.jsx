import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './assets/styles/main.scss'
import { Provider } from 'react-redux';
import { store } from './store/store.js';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
      <App />
  </Provider>
)







// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
//serviceWorkerRegistration.register()

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import { saveState } from './localStorage';
import throttle from 'lodash/throttle'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
const store = configureStore(history);

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
);

unregister()

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import initialState from './reducer/initialState'

const configureStore = (history) => {
  var savedState = JSON.parse(localStorage.getItem("state"))
  const state = savedState?savedState:initialState

  return createStore(
    connectRouter(history)(rootReducer),
    state,
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
  );
};

export default configureStore;

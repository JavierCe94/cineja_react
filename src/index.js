import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TodoApp from './todoApp';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(
    TodoApp,
    persistedState
);
store.subscribe(() => {
    saveState(store.getState());
});
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();

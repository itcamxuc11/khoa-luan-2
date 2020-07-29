import * as redux from 'redux';
import rootReducer from './reducer/rootReducer';

var store1 = redux.createStore(rootReducer);

export default store1;
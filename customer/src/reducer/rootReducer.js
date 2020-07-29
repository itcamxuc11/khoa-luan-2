import { combineReducers } from 'redux';
import cartReducer from './cart-reducer';
import searchReducer from './search-reducer';

const rootReducer = combineReducers({
    cartReducer,
    searchReducer
});

export default rootReducer;

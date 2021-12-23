import { createStore , applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ListReducer } from "../reducers/ListReducer";
import * as types from '../store/types';


const store: Store<types.ListState, types.ListAction> & {
    dispatch: types.DispatchType;
} = createStore(ListReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

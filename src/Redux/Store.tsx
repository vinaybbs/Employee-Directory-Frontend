import { applyMiddleware, combineReducers, legacy_createStore as  createStore } from "redux";
import Reducers from "./Reducers";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  statetype: Reducers,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer,applyMiddleware());

export default store;

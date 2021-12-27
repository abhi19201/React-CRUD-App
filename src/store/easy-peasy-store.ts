import { createStore, createTypedHooks } from "easy-peasy";
import model from "../model/listModel";
import * as types from "./types";

const { useStoreActions, useStoreState, useStoreDispatch } =
    createTypedHooks<types.StoreModel>();

export { useStoreActions, useStoreDispatch, useStoreState };

const store = createStore(model);

export default store;

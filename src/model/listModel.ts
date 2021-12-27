import { action } from "easy-peasy";
import * as types from "../store/types";

const listReducer: types.ListModel = {
    list: [],
    editIndex: null,
    setList: action((state, payload) => {
        state.list = [...payload.list];
        state.editIndex = payload.editIndex;
    }),
};


const model: types.StoreModel = {
    listReducer,
};

export default model;
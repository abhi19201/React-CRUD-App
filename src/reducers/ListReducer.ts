import * as type from "../store/types"

const initialState: type.ListState = {
    list: [],
    editIndex: null,
}

export const ListReducer = (state: type.ListState = initialState, action:type.ListAction): type.ListState => {
    switch (action.type) {
        case 'SET_LIST_REQUEST':
            return {
                ...state,
                list: [...action.list],
                editIndex: action.editIndex,
            };
        default:
            return state;
    }
};




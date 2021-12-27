import { Action } from "easy-peasy";
interface IListItem {
    id: number;
    name: string;
    gender: string;
    age: string;
}

type ListState = {
    list: IListItem[];
    editIndex: number | null;
};

type ListAction = {
    type: string;
    list: IListItem[];
    editIndex: number | null;
};

interface ListModel {
    list: IListItem[];
    editIndex: number | null;
    setList: Action<ListState, ListState>;
}

interface StoreModel {
    listReducer: ListModel;
}

type DispatchType = (args: ListAction) => ListAction;

export type {
    IListItem,
    ListState,
    ListAction,
    DispatchType,
    ListModel,
    StoreModel,
};

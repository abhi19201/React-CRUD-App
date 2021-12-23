interface IListItem {
    id: number;
    name: string;
    gender: string;
    age: string;
};

type ListState = {
    list: IListItem[];
    editIndex: number | null;
};

type ListAction = {
    type: string;
    list: IListItem[];
    editIndex: number | null;
};

type DispatchType = (args: ListAction) => ListAction;

export type { IListItem, ListState, ListAction, DispatchType };
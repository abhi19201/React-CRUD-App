import * as React from 'react';

type ListItemType = {
    id: number;
    name: string;
    gender: string;
    age: string;
};

interface listInterface {
    list: ListItemType[];
    setList: (value: ListItemType[]) => void;
    editIndex: number | null;
    setEditIndex: (value: number | null) => void;
}

const ListContext = React.createContext<listInterface>({
    list: [],
    setList: () => {},
    editIndex: null,
    setEditIndex: ()=>{},
});

export default ListContext;
export type { ListItemType };
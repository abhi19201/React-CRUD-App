import React from 'react';


const ListContext = React.createContext({
    list: [],
    setList: () => {},
    editIndex: null,
    setEditIndex: ()=>{},
});

export default ListContext;
import React, { useState } from "react";
import ListContext from "./store/listContext";
import "./App.css";
import Form from "./components/form/Form";
import ListItems from "./components/ListItems.js/ListItems";

function App() {
    const [list, setList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const value = { list, setList, editIndex, setEditIndex };

    return (
        <div className='App'>
            <ListContext.Provider value={value}>
                <ListItems />
                <Form />
            </ListContext.Provider>
        </div>
    );
}

export default App;

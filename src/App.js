import React, { useState } from "react";
import ListContext from "./store/listContext";
import "./App.css";
import Form from "./components/form/Form";
import ListItems from "./components/ListItems.js/ListItems";

function App() {
    const [list, setList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editStatus, setEditStatus] = useState(false);
    const value = { list, setList, editIndex, setEditIndex };

    const submitForm = (submittedList, submittedEditStatus) => {
        if (submittedList) submitForm([...submittedList]);

        if (submittedEditStatus) setEditStatus(submittedEditStatus);
    };

    const getEditIndex = (index) => {
        console.log(index);
        setEditIndex(index);
    };

    return (
        <div className='App'>
            <ListContext.Provider value={value}>
                <ListItems sendEditIndex={getEditIndex} />
                <Form submitForm={submitForm} />
            </ListContext.Provider>
        </div>
    );
}

export default App;

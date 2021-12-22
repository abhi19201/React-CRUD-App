import { useState } from "react";
import ListContext, { ListItemType } from "./store/listContext";
import "./App.css";
import Form from "./components/form/Form";
import ListItems from "./components/ListItems/ListItems";


function App() {
    const [list, setList] = useState<ListItemType[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
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

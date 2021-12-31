import React from 'react';
import "./App.css";
import Form from "./components/form/Form";
import ListItems from "./components/ListItems/ListItems";
import ReactForm from './components/react-form/Form';


function App() {

    return (
        <div className='App'>
            <ListItems />
            <ReactForm />
            {/* <ListItems />
                <Form /> */}
        </div>
    );
}

export default App;

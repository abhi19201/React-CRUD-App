import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import "./form.css";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from 'redux';
import * as types from "../../store/types";


export default function Form() {
    const dispatch: Dispatch<any> = useDispatch();
    const { list, editIndex } = useSelector((state: types.ListState) => state);

    const [user, setUser] = useState<types.IListItem>({
        id: -1,
        name: "",
        gender: "",
        age: "",
    });

    useEffect(() => {
        if (editIndex != null) setUser(list[editIndex]);
        else {
            setUser((prev) => {
                return { ...prev, id: Date.now() };
            });
        }
    }, [editIndex, list]);

    const changeHandler = (
        value: string,
        field: string
    ) => {
        setUser((prev) => {
            return { ...prev, [field]: value };
        });
    };

    const addHandler = () => {
        if (editIndex != null) {
            let newList = list;
            newList[editIndex] = user;
            
            dispatch({
                type: "SET_LIST_REQUEST",
                list: newList,
                editIndex: null,
            });
        }

        if (editIndex === null) dispatch({
            type: "SET_LIST_REQUEST",
            list: [...list, user],
            editIndex: null,
        });
        setUser({ id: -1, name: "", gender: "", age: "" });
    };

    return (
        <div className='form'>
            <TextField
                label='Name'
                variant='outlined'
                value={user.name}
                onChange={(e) => changeHandler(e.target.value, "name")}
            />
            
            <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Age</InputLabel>
                <Select
                    value={user.gender}
                    label='Age'
                    onChange={(e) => changeHandler(e.target.value, "gender")}>
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                </Select>
            </FormControl>


            <TextField
                id='outlined-basic'
                label='Age'
                variant='outlined'
                type="number"
                value={user.age}
                onChange={(e) => changeHandler(e.target.value, "age")}
            />

            <Button
                variant='contained'
                onClick={() => {
                    addHandler();
                }}>
                {editIndex != null ? "Edit" : "Add"}
            </Button>
        </div>
    );
}

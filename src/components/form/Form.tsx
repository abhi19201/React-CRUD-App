import React, { useState, useEffect } from "react";
import {
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    FormHelperText,
} from "@mui/material";

import "./form.css";
import { useStoreActions, useStoreState } from "../../store/easy-peasy-store";
import * as types from "../../store/types";


export default function Form() {
    const { list, editIndex } = useStoreState((state) => state.listReducer);
    const { setList } = useStoreActions((actions) => actions.listReducer);
    const [emptyTextFieldError, setEmptyTextFieldError] = useState<boolean[]>([
        false,
    ]);
    const [negativeAgeError, setNegativeAgeError] = useState<boolean>(false);

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


    
    const changeHandler = (value: string, field: string) => {
        setEmptyTextFieldError([false]);
        setNegativeAgeError(false);
        setUser((prev) => {
            return { ...prev, [field]: value };
        });
    };

    const addHandler = () => {
        if (user.name === "") {
            setEmptyTextFieldError([true, false, false]);
            return;
        } else if (user.gender === "") {
            setEmptyTextFieldError([false, true, false]);
            return;
        } else if (user.age === "") {
            setEmptyTextFieldError([false, false, true]);
            return;
        } else if (parseInt(user.age) < 1) {
            setNegativeAgeError(true);
            setUser((prev) => {
                return { ...prev, age: "" };
            });
            return;
        }

        if (editIndex != null) {
            let newList = list;
            newList[editIndex] = user;

            setList({
                list: newList,
                editIndex: null,
            });
        }

        if (editIndex === null)
            setList({
                list: [...list, user],
                editIndex: null,
            });
        setUser({ id: -1, name: "", gender: "", age: "" });
    };

    const setAgeHelperText = () => {
        if (emptyTextFieldError[2]) {
            return "Age Field is Empty.";
        } else if (negativeAgeError) {
            return "Please add valid age.";
        } else {
            return "";
        }
    };

    return (
        <div className='form'>
            <TextField
                error={emptyTextFieldError[0]}
                helperText={emptyTextFieldError[0] && "Name Field is Empty."}
                label='Name'
                variant='outlined'
                value={user.name}
                onChange={(e) => changeHandler(e.target.value, "name")}
            />

            <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
                <Select
                    error={emptyTextFieldError[1]}
                    value={user.gender}
                    label='Gender'
                    onChange={(e) => changeHandler(e.target.value, "gender")}>
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                </Select>
                <FormHelperText>
                    {emptyTextFieldError[1] && "Gender Field is Empty."}
                </FormHelperText>
            </FormControl>

            <TextField
                error={emptyTextFieldError[2] || negativeAgeError}
                helperText={setAgeHelperText()}
                id='outlined-basic'
                label='Age'
                variant='outlined'
                type='number'
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

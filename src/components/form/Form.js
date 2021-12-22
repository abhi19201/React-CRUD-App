import React, { useState, useContext, useEffect } from "react";
import ListContext from "../../store/listContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./form.css";

export default function Form(props) {
    const [user, setUser] = useState({
        id: null,
        name: "",
        gender: "",
        age: "",
    });
    const ctx = useContext(ListContext);

    useEffect(() => {
        if (ctx.editIndex != null) setUser(ctx.list[ctx.editIndex]);
        else {
            setUser((prev) => {
                return { ...prev, id: Date.now() };
            });
        }
    }, [ctx.editIndex, ctx.list]);

    const changeHandler = (e, field) => {
        setUser((prev) => {
            return { ...prev, [field]: e.target.value };
        });
    }

    const addHandler = () => {
        if (ctx.editIndex != null) {
            let newList = ctx.list;
            newList[ctx.editIndex] = user;
            ctx.setList(newList);
            ctx.setEditIndex(null);
        }

        if (ctx.editIndex === null) ctx.setList([...ctx.list, user]);
        setUser({ id: null, name: "", gender: "", age: "" });
    };

    return (
        <div className='form'>
            <TextField
                id='outlined-basic'
                label='Name'
                variant='outlined'
                value={user.name}
                onChange={(e) => changeHandler(e, "name")}
            />
            <TextField
                id='outlined-basic'
                label='Gender'
                variant='outlined'
                value={user.gender}
                onChange={(e) => changeHandler(e, "gender")}
            />
            <TextField
                id='outlined-basic'
                label='Age'
                variant='outlined'
                value={user.age}
                onChange={(e) => changeHandler(e, "age")}
            />

            <Button
                variant='contained'
                onClick={() => {
                    addHandler();
                }}>
                {ctx.editIndex != null ? "Edit" : "Add"}
            </Button>
        </div>
    );
}

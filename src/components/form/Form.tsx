import React, { useState, useContext, useEffect } from "react";
import ListContext, { ListItemType } from "../../store/listContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./form.css";


export default function Form() {

    const [user, setUser] = useState<ListItemType>({
        id: -1,
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

    const changeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: string
    ) => {
        setUser((prev) => {
            return { ...prev, [field]: e.target.value };
        });
    };

    const addHandler = () => {
        if (ctx.editIndex != null) {
            let newList = ctx.list;
            newList[ctx.editIndex] = user;
            ctx.setList(newList);
            ctx.setEditIndex(null);
        }

        if (ctx.editIndex === null) ctx.setList([...ctx.list, user]);
        setUser({ id: -1, name: "", gender: "", age: "" });
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

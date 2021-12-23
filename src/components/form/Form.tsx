import React, { useState, useContext, useEffect } from "react";
import ListContext, { ListItemType } from "../../store/listContext";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
        value: string,
        field: string
    ) => {
        setUser((prev) => {
            return { ...prev, [field]: value };
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
                {ctx.editIndex != null ? "Edit" : "Add"}
            </Button>
        </div>
    );
}

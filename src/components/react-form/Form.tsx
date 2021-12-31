import React, { useState, useEffect } from "react";
import { ReactForm } from "react-forms";
import { useStoreActions, useStoreState } from "../../store/easy-peasy-store";
import * as types from "../../store/types";
import "./form.css";

export default function Form() {
    const { list, editIndex } = useStoreState((state) => state.listReducer);
    const { setList } = useStoreActions((actions) => actions.listReducer);
    const [emptyTextFieldError, setEmptyTextFieldError] = useState<boolean[]>([
        false,
    ]);
    const [negativeAgeError, setNegativeAgeError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false)

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
        console.log(field)
        setEmptyTextFieldError([false]);
        setNegativeAgeError(false);
        setUser((prev) => {
            return { ...prev, [field]: value };
        });
    };

    const addHandler = () => {
        setLoading(true);

        console.log("add");

        if (user.name === "") {
            setEmptyTextFieldError([true, false, false]);
            console.log("add1");
            setLoading(false);
            return;
        } else if (user.gender === "") {
            setEmptyTextFieldError([false, true, false]);
            console.log("add2");
            setLoading(false);
            return;
        } else if (user.age === "") {
            setEmptyTextFieldError([false, false, true]);
            console.log("add3");
            setLoading(false);
            return;
        } else if (parseInt(user.age) < 1) {
            setNegativeAgeError(true);
            setUser((prev) => {
                return { ...prev, age: "" };
            });
            console.log("add4");
            setLoading(false);
            return;
        }

        console.log("add5");

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
        setLoading(false);
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

    const myConfig = [
        {
            type: "text",
            valueKey: "name",
            classNames: ["formItems"],
            fieldProps: {
                error: emptyTextFieldError[0],
                helperText: emptyTextFieldError[0] && "Name Field is Empty.",
                label: "Name",
                variant: "outlined",
                value: user.name,
                onChange: (e: {
                    target: HTMLTextAreaElement | HTMLInputElement;
                }) => { changeHandler(e.target.value, "name")},
            },
            styles: { margin: "0 auto" },
        },
        {
            type: "select",
            valueKey: "mySelect",
            classNames: ["formItems"],
            fieldProps: {
                error: emptyTextFieldError[1],
                value: user.gender,
                helperText: emptyTextFieldError[1] && "Gender Field is Empty.",
                label: "Gender",
                variant: "outlined",
                onChange: (e: { target: { value: string } }) =>
                    changeHandler(e.target.value, "gender"),
                options: [
                    { name: "Male", value: "Male" },
                    { name: "Female", value: "Female" },
                ],
            },
            styles: { width: "100%" },
        },
        {
            type: "text",
            valueKey: "age",
            classNames: ["formItems"],
            fieldProps: {
                error: emptyTextFieldError[2] || negativeAgeError,
                value: user.age,
                helperText: setAgeHelperText(),
                label: "Age",
                type: "number",
                variant: "outlined",
                onChange: (e: {
                    target: HTMLTextAreaElement | HTMLInputElement;
                }) => changeHandler(e.target.value, "age"),
            },
            styles: { margin: "0 auto" },
        },
    ];


    return (
        <div className='form'>
            <ReactForm
                config={myConfig}
                formId={"1"}
                onSubmit={() => {
                    addHandler();
                }}
                actionConfig={{
                    submitButtonText: editIndex != null ? "Edit" : "Add",
                    submitButtonLayout: "fullWidth",
                    containerClassNames: "submitButton",
                }}
                isInProgress= {loading}
            />
        </div>
    );
}

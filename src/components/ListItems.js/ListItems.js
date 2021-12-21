import React, { useContext } from "react";
import ListContext from "../../store/listContext";
import "./listItem.css";
import Button from "@mui/material/Button";

export default function ListItems(props) {
    const ctx = useContext(ListContext);

    const editHandler = (index) => {
        ctx.setEditIndex(index);
    };

    const deleteHandler = (index) => {
        let newList = [...(ctx.list)];
        newList.splice(index, 1);
        ctx.setList(newList);
    };

    return (
        <div className='listItems'>
            {ctx.list.map((item, index) => {
                return (
                    <div key={item.id}>
                        <div className="item">
                            <div>
                                Name : <span>{item.name}</span>
                                
                            </div>
                            <div>
                                Gender : <span>{item.gender}</span>
                                
                            </div>
                            <div>
                                Age : <span>{item.age}</span>
                                
                            </div>
                        </div>
                        <div className='buttons'>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    editHandler(index);
                                }}>
                                Edit
                            </Button>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    deleteHandler(index);
                                }}>
                                Delete
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

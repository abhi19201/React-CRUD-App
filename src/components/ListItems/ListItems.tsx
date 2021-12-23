import { useContext } from "react";
import ListContext from "../../store/listContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./listItem.css";
import Button from "@mui/material/Button";

export default function ListItems() {
    const ctx = useContext(ListContext);

    const editHandler = (index: number) => {
        ctx.setEditIndex(index);
    };

    const deleteHandler = (index: number) => {
        let newList = [...ctx.list];
        newList.splice(index, 1);
        ctx.setList(newList);
    };

    return (
        <div className='listItems'>
            {ctx.list.map((item, index) => {
                return (
                    <Card key={item.id}>
                        <CardContent className='item'>
                            <Typography>
                                Name : <span>{item.name}</span>
                            </Typography>
                            <Typography>
                                Gender : <span>{item.gender}</span>
                            </Typography>
                            <Typography>
                                Age : <span>{item.age}</span>
                            </Typography>
                        </CardContent>
                        <CardContent className='buttons'>
                            <CardActions>
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
                            </CardActions>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

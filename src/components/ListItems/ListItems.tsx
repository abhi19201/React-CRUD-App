import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./listItem.css";
import Button from "@mui/material/Button";
import { useStoreActions, useStoreState } from "../../store/easy-peasy-store";


export default function ListItems() {
    const { list } = useStoreState((state) => state.listReducer);
    const { setList } = useStoreActions((actions) => actions.listReducer);

    const editHandler = (index: number) => {
        setList({
            list: list,
            editIndex: index,
        });
    };

    const deleteHandler = (index: number) => {
        let newList = [...list];
        newList.splice(index, 1);
        setList({
            list: newList,
            editIndex: null,
        });
    };

    return (
        <div className='listItems'>
            {list.map((item, index) => {
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

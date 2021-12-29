import { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import "./listItem.css";
import { useStoreActions, useStoreState } from "../../store/easy-peasy-store";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";

export default function ListItems() {
    const { list } = useStoreState((state) => state.listReducer);
    const { setList } = useStoreActions((actions) => actions.listReducer);
    const [openAlert, setOpenAlert] = useState(false);

    const handleAlertOpen = () => {
        setOpenAlert(true);
    };

    const handleAlertClose = (index: number, deleteAgree: boolean) => {
        setOpenAlert(false);

        if (!deleteAgree) return;

        let newList = [...list];
        newList.splice(index, 1);
        setList({
            list: newList,
            editIndex: null,
        });
    };

    const editHandler = (index: number) => {
        setList({
            list: list,
            editIndex: index,
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
                                    onClick={handleAlertOpen}>
                                    Delete
                                </Button>
                                <Dialog
                                    open={openAlert}
                                    onClose={() =>
                                        handleAlertClose(index, false)
                                    }
                                    aria-labelledby='alert-dialog-title'
                                    aria-describedby='alert-dialog-description'>
                                    <DialogTitle id='alert-dialog-title'>
                                        {"Do you want to delete this Card?"}
                                    </DialogTitle>

                                    <DialogActions>
                                        <Button
                                            onClick={() => {
                                                handleAlertClose(index, false);
                                            }}>
                                            Disagree
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                handleAlertClose(index, true);
                                            }}
                                            autoFocus>
                                            Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </CardActions>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

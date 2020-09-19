import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {Box, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Formik} from 'formik';
import {element} from "prop-types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddItemModal({onClose, isOpen}) {
    const classes = useStyles();

    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [responsibilities, setResponsibilities] = useState("")

    const validateForm = () => {
        const values = [title, location, startDate, endDate, responsibilities]
        return values.some(element => element.length < 1)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(validateForm())

        // onClose()
    }

    const handleChange = (event) => {

    }

    return (
        <Dialog fullScreen open={isOpen} onClose={onClose} TransitionComponent={Transition}>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <AppBar className="border-b border-light-gray relative" position="relative" color="transparent"
                        elevation={0}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            New experience
                        </Typography>
                        <Button type="submit" autoFocus disabled={validateForm()} color="primary" disableElevation variant="contained">
                            <span className="font-semibold">Add</span>
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box mt={4}>
                    <Container maxWidth="sm">
                        <div className="space-y-4">
                            <Typography variant="h6">
                                Add new experience
                            </Typography>
                            <div className="flex-row space-y-4">
                                {/*@ts-ignore*/}
                                <TextField id="title" value={title} onChange={event => setTitle(event.target.value)} className="w-full"
                                           label="Title" variant="outlined"/>
                                {/*@ts-ignore*/}
                                <TextField id="location" value={location} onChange={event => setLocation(event.target.value)}
                                           className="w-full" label="Location" variant="outlined"/>
                            </div>
                            <div className="flex justify-between space-x-2">
                                {/*@ts-ignore*/}
                                <TextField value={startDate} onChange={event => setStartDate(event.target.value)}
                                           id="start-date" className="w-1/2" label="Start Date" variant="outlined"/>
                                {/*@ts-ignore*/}
                                <TextField value={endDate} onChange={event => setEndDate(event.target.value)}
                                           id="end-date" className="w-1/2" label="End Date" variant="outlined"/>
                            </div>
                            <TextField multiline rows={5} id="responsibilities" className="w-full"
                                //                                       @ts-ignore
                                       value={responsibilities} onChange={event => setResponsibilities(event.target.value)}
                                       label="Responsibilities" variant="outlined"/>
                        </div>

                    </Container>
                </Box>
            </form>
        </Dialog>
    );
}

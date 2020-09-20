import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {Box, Container, LinearProgress, TextField} from "@material-ui/core";
import {useMutation} from "urql";
import {InsertExperience} from "../../src/gql/resumes/resume";
import { v4 as uuidv4 } from 'uuid';

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

export default function AddItemModal({onClose, isOpen, session, currentItem}) {
    const classes = useStyles();

    const [isLoading, toggleIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [responsibilities, setResponsibilities] = useState("")

    const [addExperienceResult, addExperience] = useMutation(InsertExperience);

    const validateForm = () => {
        const values = [title, location, startDate, endDate, responsibilities]
        return values.some(element => element.length < 1)
    }

    const closeModal = () => {
        toggleIsLoading(false)
        setTitle("")
        setLocation("")
        setStartDate("")
        setEndDate("")
        setResponsibilities("")
        onClose()
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        toggleIsLoading(true)
        addExperience({
            experienceId: currentItem ? currentItem.id : uuidv4(),
            title: title,
            userId: session.id,
            location: location,
            startDate: startDate,
            endDate: endDate,
            responsibilities: responsibilities
        })
            .then(result => {
                closeModal()
            })

        // onClose()
    }

    useEffect(() => {
        if (currentItem) {
            setTitle(currentItem.title)
            setLocation(currentItem.location)
            setStartDate(currentItem.start_date)
            setEndDate(currentItem.end_date)
            setResponsibilities(currentItem.responsibilities)
        } else {
            setTitle("")
            setLocation("")
            setStartDate("")
            setEndDate("")
            setResponsibilities("")
        }
    }, [currentItem])

    return (
        <Dialog fullScreen open={isOpen} onClose={closeModal} TransitionComponent={Transition}>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <AppBar className="border-b border-light-gray relative" position="relative" color="transparent"
                        elevation={0}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {currentItem ? `Edit ${currentItem.title}` : "New experience"}
                        </Typography>
                        <Button type="submit" autoFocus disabled={validateForm() || isLoading} color="primary"
                                disableElevation variant="contained">
                            <span className="font-semibold">{currentItem ? `Sav${isLoading ? "ing..." : "e"}` : `Add${isLoading ? "ing..." : ""}`}</span>
                        </Button>
                    </Toolbar>
                    {isLoading ? <LinearProgress/> : null}
                </AppBar>
                <Box mt={4}>
                    <Container maxWidth="sm">
                        <div className="space-y-4">
                            <Typography variant="h6">
                                {currentItem ? "Edit experience" : "Add new experience"}
                            </Typography>
                            <div className="flex-row space-y-4">
                                {/*@ts-ignore*/}
                                <TextField id="title" value={title} onChange={event => setTitle(event.target.value)}
                                           className="w-full"
                                           label="Title" variant="outlined"/>
                                {/*@ts-ignore*/}
                                <TextField id="location" value={location}
                                           onChange={event => setLocation(event.target.value)}
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
                                       value={responsibilities}
                                       onChange={event => setResponsibilities(event.target.value)}
                                       label="Responsibilities" variant="outlined"/>
                        </div>

                    </Container>
                </Box>
            </form>
        </Dialog>
    );
}

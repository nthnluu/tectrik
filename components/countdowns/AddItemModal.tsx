import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import {Box, Container, DialogActions, LinearProgress, TextField} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {useMutation} from "urql";
import {v4 as uuidv4} from 'uuid';
import {KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers';
import {InsertCountdown} from "../../src/gql/countdowns/countdowns";


export default function AddItemModal({onClose, isOpen, session, currentItem}) {
    const [isLoading, toggleIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [countdownTo, setCountdownTo] = useState(() => new Date)

    const [addCountdownResume, addCountdown] = useMutation(InsertCountdown);

    const validateForm = () => {
        return title.length > 0
    }

    const closeModal = () => {
        onClose()
        setTitle("")
        setCountdownTo(new Date)
        toggleIsLoading(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        toggleIsLoading(true)
        addCountdown({
            countdownId: currentItem ? currentItem.id : uuidv4(),
            title: title,
            userId: session.id,
            countdownTo: countdownTo
        })
            .then(result => {
                closeModal()
            })

    }

    useEffect(() => {
        if (currentItem) {
            setTitle(currentItem.title)
            setCountdownTo(currentItem.countdown_to)
        } else {
            setTitle("")
            setCountdownTo(() => new Date)
        }
    }, [currentItem])

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Dialog maxWidth="sm" disableBackdropClick={isLoading} fullWidth open={isOpen} onClose={closeModal}
                    PaperProps={{
                        style: {borderRadius: 9}
                    }}>
                <LinearProgress hidden={!isLoading}/>
                <Box p={1}>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Box my={2}>
                            <Container>
                                <div className="space-y-4 font-body">
                                    <Typography variant="h6">
                                        {currentItem ? "Edit countdown" : "Add new countdown"}
                                    </Typography>
                                    <div className="flex-row">
                                        {/*@ts-ignore*/}
                                        <TextField id="title" autoFocus value={title}
                                                   disabled={isLoading}
                                                   onChange={event => setTitle(event.target.value)}
                                                   className="w-full"
                                                   label="Title" variant="outlined"/>
                                        {/*@ts-ignore*/}
                                        <div className="flex-row md:flex justify-between md:space-x-4">
                                            <KeyboardDatePicker
                                                disabled={isLoading}
                                                disablePast
                                                inputVariant="outlined"
                                                margin="normal"
                                                className="w-full md:w-1/2"
                                                id="date-picker-dialog"
                                                label="Date"
                                                format="MM/dd/yyyy"
                                                onChange={date => setCountdownTo(date)}
                                                value={countdownTo}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            <KeyboardTimePicker
                                                disabled={isLoading}
                                                inputVariant="outlined"
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Time"
                                                className="w-full md:w-1/2"
                                                value={countdownTo}
                                                onChange={date => setCountdownTo(date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </div>


                                    </div>
                                </div>

                            </Container>
                        </Box>
                    </form>
                    <DialogActions>
                        <Button onClick={closeModal} disabled={isLoading} color="secondary" size="large">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isLoading || !validateForm()} color="primary"
                                variant="contained" disableElevation size="large">
                            {currentItem ? "Save" : "Create"}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </MuiPickersUtilsProvider>
    );
}

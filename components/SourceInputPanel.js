import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Accordion from "@material-ui/core/Accordion";
import React, {useState} from "react";
import InputAdornment from "@material-ui/core/InputAdornment";

const SourceInputPanel = ({sourceName, icon, disclaimer, value, setValue}) => {
    const [sources, setSourceArray] = useState([])

    return (
        <>
            <li>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className="flex justify-between text-gray-800">
                            <Typography><i className={icon}/>{sourceName}</Typography>
                        </div>

                    </AccordionSummary>
                    <AccordionDetails>

                        <div className="w-full">
                            <form className="w-full flex justify-between items-baseline" onSubmit={event => {
                                event.preventDefault();
                                if (event.target['new-insta-source'].value.length < 1) {
                                    return
                                }
                                setValue([...value, event.target['new-insta-source'].value])
                                event.target.reset();
                                event.target.focus();
                            }}>
                                <TextField type="text" autoComplete="off" label={`${sourceName} username`}
                                           id="new-insta-source"
                                           variant="standard" className="w-full"/>
                                <Button className="w-6 pl-2" color="primary" type="submit">Add</Button>
                            </form>
                            <ul className="mt-2 space-y-1">
                                {value.map((source, index) => <li key={source} className="inline-block pr-1">
                                    <Chip
                                        variant="outlined"
                                        label={source}
                                        onDelete={() => setValue(value.filter((chip, i) => i + chip !== index + chip))}
                                    />
                                </li>)}

                            </ul>
                        </div>


                    </AccordionDetails>
                </Accordion></li>
        </>)
}

export default SourceInputPanel

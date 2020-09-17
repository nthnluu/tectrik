import Navbar from "../components/Navbar";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import SourceInputPanel from "../components/SourceInputPanel";
import {useMutation} from "@apollo/client";
import {NewSearch} from "../src/gql/Search";
import {useSession} from 'next-auth/client'
import {useRouter} from "next/router";


const Dashboard = () => {
    const [session, loading] = useSession()

    const [isFocused, toggleFocused] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [creationMode, setCreationMode] = useState(false)
    const [isLoading, toggleIsLoading] = useState(false)
    const router = useRouter()

    const [sourceObject, setSourceObject] = useState({
        twitter: [],
        instagram: [],
        facebook: [],
        youtube: [],
        reddit: []
    })

    const [addSearch, {data}] = useMutation(NewSearch);

    if (loading || session) {
        return (<div>
            <Navbar isLoading={isLoading}/>
            <div className="py-16">
                <Container maxWidth="md">
                    <Typography component="h1" variant="h6">Create a new search</Typography>
                    <Box align="center" pt={3}>
                        <Paper style={{backgroundColor: "white"}} elevation={isFocused ? 4 : 1}>
                            <Box p={1}>
                                <input onChange={event => setNewTitle(event.target.value)} value={newTitle}
                                       onFocus={() => toggleFocused(true)} onBlur={() => toggleFocused(false)}
                                       placeholder="New search name" className="w-full text-lg focus:outline-none p-2"/>
                            </Box>
                        </Paper>
                    </Box>
                    {creationMode ? <div>
                        <Typography component="h1" variant="h6" className="pt-12">Add sources</Typography>
                        <ul className="mt-4 space-y-3">
                            <SourceInputPanel setValue={newValue => setSourceObject({
                                ...sourceObject, instagram: newValue
                            })} value={sourceObject.instagram} sourceName="Instagram" icon="fab fa-instagram mr-2"
                                              disclaimer="If you add an user that is private, you must be following them with your provided account to receive data."/>
                            <SourceInputPanel setValue={newValue => setSourceObject({
                                ...sourceObject, twitter: newValue
                            })} value={sourceObject.twitter} sourceName="Twitter" icon="fab fa-twitter mr-2"
                                              disclaimer=""/>
                            <SourceInputPanel setValue={newValue => setSourceObject({
                                ...sourceObject, facebook: newValue
                            })} value={sourceObject.facebook} sourceName="Facebook" icon="fab fa-facebook mr-2"/>
                            <SourceInputPanel setValue={newValue => setSourceObject({
                                ...sourceObject, youtube: newValue
                            })} value={sourceObject.youtube} sourceName="Youtube" icon="fab fa-youtube mr-2"/>
                            <SourceInputPanel setValue={newValue => setSourceObject({
                                ...sourceObject, reddit: newValue
                            })} value={sourceObject.reddit} sourceName="Reddit" icon="fab fa-reddit mr-2"/>
                        </ul>


                    </div> : null}

                    <div className="w-full flex justify-end mt-6">
                        <Button disabled={newTitle.length < 1 || isLoading} disableElevation variant="contained"
                                size="medium" color="primary"
                                className="focus:outline-none" onClick={creationMode ? () => {
                            toggleIsLoading(true)
                            addSearch({variables: {title: newTitle, sources: sourceObject, userId: session.id}})
                                .then(result => {
                                    console.log(result)
                                    router.push('/search/' + result.data.insert_search.returning[0].id)
                                    toggleIsLoading(false)
                                })
                                .catch(() => toggleIsLoading(false))
                        } : () => setCreationMode(true)}>
                            {creationMode ? "Create Search" : "Next"}
                        </Button>

                    </div>


                </Container>
            </div>

        </div>)
    } else {
        window.location.href = '/'
        return <></>
    }

}


export default Dashboard

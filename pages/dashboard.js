import Navbar from "../components/Navbar";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SearchList from "../components/SearchList";
import React, {useState} from "react";
import {useSession} from "next-auth/client";


const Dashboard = () => {
    const [isLoading, toggleIsLoading] = useState(true)
    const [ session, loading ] = useSession()

    if (loading || session) {
        return (<>
            <Navbar isLoading={isLoading}/>
            <div className="py-16">
                <Container maxWidth="md">
                    <Typography component="h1" variant="h6">Your Searches</Typography>
                    <SearchList toggleLoading={toggleIsLoading}/>
                </Container>
            </div>
        </>)
    } else {
        window.location.href = '/'
        return <></>
    }


}



export default Dashboard

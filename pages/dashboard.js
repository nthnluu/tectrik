import React, {useContext} from "react";
import PageLayout from "../components/PageLayout";
import {Container, Typography} from "@material-ui/core";
import {useSession} from "next-auth/client";


const Dashboard = () => {

    const [ session, loading ] = useSession()

    if (loading) return null

    return (<PageLayout title="Dashboard" maxWidth="xl">
        <section>
            <Container maxWidth="xs">
                <img alt={session.name} src={session.picture} className="mx-auto rounded-full h-24 w-24 mb-4"/>
                <Typography variant="h4" gutterBottom className="text-center">
                    Welcome, {session.name}
                </Typography>
            </Container>

        </section>

    </PageLayout>)
}



export default Dashboard

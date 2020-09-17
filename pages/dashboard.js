import React, {useContext} from "react";
import PageLayout from "../components/PageLayout";
import {Container, Typography} from "@material-ui/core";
import {useSession} from "next-auth/client";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";


const Card = ({title, caption, image, buttonLabel}) => {
    return <div variant="outlined" className="border border-gray-300 rounded-lg">
        <Box p={3}>
            <img src={image} alt="" className="h-56 mx-auto mb-6"/>
            <Typography variant="h5" gutterBottom>{title}</Typography>
            <Typography variant="body2">{caption}</Typography>
            <div className="mt-6">
                <Button disableElevation variant="contained" color="primary">
                    {buttonLabel}
                </Button>
            </div>

        </Box>
    </div>
}

const Dashboard = () => {

    const [ session, loading ] = useSession()

    if (loading) return null

    return (<PageLayout title="Dashboard" maxWidth="xl">
        <section>
            <Container maxWidth="xs">
                <img alt={session.name} src={session.picture} className="mx-auto rounded-full h-24 w-24 mb-4"/>
                <Typography variant="h4" gutterBottom className="text-center text-gray-800">
                    Welcome, {session.name}
                </Typography>
            </Container>
            <Box my={8}>
                <Container maxWidth="lg">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card image="track_meals.svg" title="Plan your meals" caption="Create a customized meal plan
                        and keep track of your goals." buttonLabel="Go to Meal Planner"/>
                        <Card image="workout.svg" title="Track your workouts" caption="Generate and keep track of your
                        workout plans at home or at the gym." buttonLabel="Go to Workout Tracker"/>
                        <Card image="porn.svg" title="Watch porn" caption="Privately store your favorite porn videos
                        and access them anywhere." buttonLabel="Go to Porn Locker"/>
                    </div>
                </Container>
            </Box>



        </section>

    </PageLayout>)
}



export default Dashboard

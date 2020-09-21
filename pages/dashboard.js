import React, {useContext} from "react";
import PageLayout from "../components/PageLayout";
import {Container, Typography} from "@material-ui/core";
import {useSession} from "next-auth/client";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {useRouter} from 'next/router'


const Card = ({title, caption, image, appName, href}) => {
    const router = useRouter()
    return <div variant="outlined" className="border border-light-gray rounded-lg">
        <Box p={3}>
            <img src={image} alt="" className="h-56 mx-auto mb-6"/>
            <Typography variant="h5" gutterBottom>{title}</Typography>
            <Typography variant="body2">{caption}</Typography>
            <div className="mt-6">
                <Button disableElevation variant="contained" color="primary" onClick={() => router.push(href)}>
                    Go to {appName}
                </Button>
            </div>

        </Box>
    </div>
}

const Dashboard = () => {

    const [session, loading] = useSession()

    if (loading) return null

    const pageCards = [{
        title: "Manage resumes",
        caption: "Keep track of your information and generate beautiful resumes.",
        appName: "Resumes",
        href: "/resumes",
        image: "resume.svg"
    }, {
        title: "View countdowns",
        caption: "Create and view countdowns to important dates.",
        appName: "Countdowns",
        href: "/countdowns",
        image: "timer.svg"
    }]

    return (<PageLayout title="Dashboard" maxWidth="xl" showLogo>
        <section>
            <Container maxWidth="xs" className="mt-8">
                <Typography variant="h4" gutterBottom className="text-center text-gray-800 font-semibold">
                    Explore Tectrik Apps
                </Typography>
            </Container>
            <Box my={8}>
                <Container maxWidth="lg">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {pageCards.map(({title, caption, appName, href, image}, index) => <Card key={index}
                                                                                                          image={image}
                                                                                                          title={title}
                                                                                                          caption={caption}
                                                                                                          appName={appName}
                                                                                                          href={href}/>)}
                    </div>
                </Container>
            </Box>


        </section>

    </PageLayout>)
}


export default Dashboard

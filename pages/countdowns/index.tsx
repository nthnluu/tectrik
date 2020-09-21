import React, {useEffect, useState} from "react";
import PageLayout from "../../components/PageLayout";
import {Box, CardActionArea, Container} from "@material-ui/core";
import {useSession} from "next-auth/client";
import {SidebarConfig} from "../../components/countdowns/SidebarConfig";
import Typography from "@material-ui/core/Typography";
import AddItemModal from "../../components/countdowns/AddItemModal";
import {useSubscription} from "urql";
import {PageContent} from "../../src/gql/countdowns/countdowns";
import Countdown from "react-countdown";
import { format } from 'date-fns'

const Countdowns = ({session}) => {

    const [addModal, toggleAddModal] = useState(false)
    const [currentItem, setCurrentItem] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const handleSubscription = (messages = [], response) => {
        return response;
    };

    const [res] = useSubscription({
        query: PageContent,
        variables: {
            userId: session.id
        }
    }, handleSubscription);

    const {data, fetching, error} = res

    useEffect(() => setIsLoading(!data), [data])

    const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <span className="text-3xl text-gray-800">Complete</span>;
        } else {
            // Render a countdown
            return <span className="text-3xl text-gray-800">{days}d {hours}h {minutes}m {seconds}s</span>;
        }
    };

    return (
        <>
            <AddItemModal session={session} currentItem={currentItem} isOpen={addModal} onClose={() => {
                toggleAddModal(false)
                setTimeout(() => setCurrentItem(undefined), 500)
            }}/>
            <PageLayout is_loading={isLoading} title="Countdowns" maxWidth="xl" sidebarConfig={SidebarConfig('countdowns')}>
                <>
                    <section>
                        <div className="max-w-2xl mx-auto">
                            <div>
                                <Box mb={2}>
                                    <Typography variant="h5" gutterBottom>My Countdowns</Typography>
                                </Box>
                                {isLoading ? null :  <ul className="space-y-2">
                                    {data.countdowns_countdown.map(countdown => <li key={countdown.id} className="paperCard overflow-hidden">
                                        <CardActionArea onClick={() => {
                                            setCurrentItem(countdown)
                                            toggleAddModal(true)
                                        }}>
                                            <div className="p-6">
                                                <div>
                                                    <h3 className="text-lg text-gray-800 font-medium">{countdown.title}</h3>
                                                    <Countdown date={countdown.countdown_to} renderer={countdownRenderer}/>
                                                    <h4 className="text-gray-500">{format(new Date(countdown.countdown_to), 'MMM dd, yyyy')}</h4>
                                                </div>
                                            </div>
                                        </CardActionArea>
                                    </li>)}

                                    <li className="paperCard shadow overflow-hidden">
                                        <CardActionArea onClick={() => toggleAddModal(true)}>
                                            <Box p={2} className="opacity-25">

                                                <h3 className="text-lg"> <i className="fas fa-plus mr-2"/>Add countdown</h3>
                                            </Box>
                                        </CardActionArea>
                                    </li>
                                </ul>}
                                <p>{JSON.stringify(error)}</p>


                            </div>

                        </div>
                    </section>
                </>
            </PageLayout>
        </>)
}


const Page  = () => {
    const [session, loading] = useSession()

    if (!session) {
        return null
    } else {
        return <Countdowns session={session}/>
    }
}

export default Page

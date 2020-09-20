import React, {useState} from "react";
import PageLayout from "../../components/PageLayout";
import {Box, CardActionArea, Container, Fab, List, ListItem, Paper} from "@material-ui/core";
import {useSession} from "next-auth/client";
import MediaCard from "../../components/porn/Card";
import {SidebarConfig} from "../../components/meals/SidebarConfig";
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import AddItemModal from "../../components/resumes/AddItemModal";
import {useSubscription} from "urql";
import {PageContent} from "../../src/gql/resumes/resume";


const Resumes = ({session}) => {

    const [addModal, toggleAddModal] = useState(false)
    const [currentItem, setCurrentItem] = useState()

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

    if (!data) return null

    return (
        <>
            <AddItemModal session={session} currentItem={currentItem} isOpen={addModal} onClose={() => {
                toggleAddModal(false)
                setTimeout(() => setCurrentItem(undefined), 500)
            }}/>
            <PageLayout title="Resumes" maxWidth="xl" sidebarConfig={SidebarConfig('week')}>
                <>
                    <section>
                        <Container>

                        </Container>
                    </section>
                    <section>
                        <div className="max-w-2xl mx-auto">
                            <Fab style={{
                                right: 32,
                                position: 'fixed',
                                zIndex: 100,
                                bottom: 32,
                                height: 56,
                                width: 150,
                                borderRadius: 100
                            }} variant="extended" color="primary"
                                 onClick={() => toggleAddModal(true)}
                            >
                                <AddIcon/><span className="font-medium text-lg ml-1">Add item</span>
                            </Fab>
                            <div>
                                <Typography variant="h5" gutterBottom>Experience</Typography>
                                <ul className="space-y-2">
                                    {data.resumes_experience.map(experience => <li key={experience.id} className="paperCard overflow-hidden">
                                        <CardActionArea onClick={() => {
                                            setCurrentItem(experience)
                                            toggleAddModal(true)
                                        }}>
                                            <Box p={2}>
                                                <h3 className="text-lg">{experience.title}</h3>
                                                <Typography variant="body2" className="">{experience.start_date} - {experience.end_date}</Typography>
                                            </Box>
                                        </CardActionArea>
                                    </li>)}

                                    <li className="paperCardActive overflow-hidden">
                                        <CardActionArea onClick={() => toggleAddModal(true)}>
                                            <Box p={2} className="opacity-25">
                                                <h3 className="text-lg">Add experience</h3>
                                            </Box>
                                        </CardActionArea>
                                    </li>
                                </ul>

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
        return <Resumes session={session}/>
    }
}

export default Page

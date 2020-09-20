import React, {useEffect, useState} from "react";
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

    return (
        <>
            <AddItemModal session={session} currentItem={currentItem} isOpen={addModal} onClose={() => {
                toggleAddModal(false)
                setTimeout(() => setCurrentItem(undefined), 500)
            }}/>
            <PageLayout is_loading={isLoading} title="Resumes" maxWidth="xl" sidebarConfig={SidebarConfig('week')}>
                <>
                    <section>
                        <Container>

                        </Container>
                    </section>
                    <section>
                        <div className="max-w-2xl mx-auto">
                            <div>
                                <Typography variant="h5" gutterBottom>Experience</Typography>
                                {isLoading ? null :  <ul className="space-y-2">
                                    {data.resumes_experience.map(experience => <li key={experience.id} className="paperCard overflow-hidden">
                                        <CardActionArea onClick={() => {
                                            setCurrentItem(experience)
                                            toggleAddModal(true)
                                        }}>
                                            <div className="p-6">
                                                <div className="mb-4">
                                                    <h3 className="text-lg text-gray-800 font-medium">{experience.title}</h3>
                                                    <h4 className="font-body font-medium text-gray-700">{experience.start_date} - {experience.end_date}</h4>
                                                </div>
                                                <ul className="text-gray-600 font-body list-disc ml-4">
                                                    {experience.responsibilities.split("- ").map(responsibility => responsibility.length > 0 ? <li className="mb-1">{responsibility}</li> : null)}
                                                </ul>
                                            </div>
                                        </CardActionArea>
                                    </li>)}

                                    <li className="paperCard shadow overflow-hidden">
                                        <CardActionArea onClick={() => toggleAddModal(true)}>
                                            <Box p={2} className="opacity-25">
                                                <h3 className="text-lg">Add experience</h3>
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
        return <Resumes session={session}/>
    }
}

export default Page

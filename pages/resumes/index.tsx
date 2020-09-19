import React, {useState} from "react";
import PageLayout from "../../components/PageLayout";
import {Box, CardActionArea, Container, Fab, List, ListItem, Paper} from "@material-ui/core";
import {useSession} from "next-auth/client";
import MediaCard from "../../components/porn/Card";
import {SidebarConfig} from "../../components/meals/SidebarConfig";
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import AddItemModal from "../../components/resumes/AddItemModal";


const Resumes = () => {

    const [session, loading] = useSession()
    const [addModal, toggleAddModal] = useState(false)

    if (loading) return null

    return (
        <>
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
                            <AddItemModal isOpen={addModal} onClose={() => toggleAddModal(false)}/>
                            <div>
                                <Typography variant="h5" gutterBottom>Experience</Typography>
                                <ul className="space-y-2">
                                    <li className="paperCard overflow-hidden">
                                        <CardActionArea>
                                            <Box p={2}>
                                                <h3 className="text-lg">San Diego County</h3>
                                                <h4 className="">June 2019 - Present</h4>
                                            </Box>
                                        </CardActionArea>
                                    </li>
                                    <li className="paperCard overflow-hidden">
                                        <CardActionArea>
                                            <Box p={2}>
                                                <h3 className="text-lg">San Diego County</h3>
                                                <h4 className="">June 2019 - Present</h4>
                                            </Box>
                                        </CardActionArea>
                                    </li>
                                    <li className="paperCard overflow-hidden">
                                        <CardActionArea>
                                            <Box p={2}>
                                                <h3 className="text-lg">San Diego County</h3>
                                                <h4 className="">June 2019 - Present</h4>
                                            </Box>
                                        </CardActionArea>
                                    </li>
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


export default Resumes

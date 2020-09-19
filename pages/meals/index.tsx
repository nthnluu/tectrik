import React, {useState} from "react";
import PageLayout from "../../components/PageLayout";
import {Container, Fab} from "@material-ui/core";
import {useSession} from "next-auth/client";
import MediaCard from "../../components/porn/Card";
import {SidebarConfig} from "../../components/meals/SidebarConfig";
import AddIcon from '@material-ui/icons/Add';


const PornLocker = () => {

    const [session, loading] = useSession()
    const [addModal, toggleAddModal] = useState(false)

    if (loading) return null

    return (
        <>
            <PageLayout title="Meals" maxWidth="xl" sidebarConfig={SidebarConfig('week')}>
                <>
                    <section>
                        <Container>

                        </Container>
                    </section>
                    <section>
                        <Container maxWidth={false}>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            </div>
                        </Container>
                    </section>
                </>
            </PageLayout>
        </>)
}


export default PornLocker

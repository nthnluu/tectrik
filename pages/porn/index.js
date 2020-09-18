import React from "react";
import PageLayout from "../../components/PageLayout";
import {Container} from "@material-ui/core";
import {useSession} from "next-auth/client";
import MediaCard from "../../components/porn/Card";
import {SidebarConfig} from "../../components/porn/SidebarConfig";


const PornLocker = () => {

    const [ session, loading ] = useSession()

    if (loading) return null

    return (<PageLayout title="Porn Locker" maxWidth="xl" sidebarConfig={SidebarConfig('library')}>
        <section>
            <Container maxWidth={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <MediaCard title=""/>
                    <MediaCard title=""/>
                    <MediaCard title=""/>
                    <MediaCard title=""/>
                    <MediaCard title=""/>
                    <MediaCard title=""/>
                    <MediaCard title=""/>
                    <MediaCard title=""/>
                    <MediaCard title=""/>
                    <MediaCard title=""/>
                    <MediaCard title=""/>
                </div>
            </Container>
        </section>

    </PageLayout>)
}



export default PornLocker

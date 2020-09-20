import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/client";
import Navbar from "./Navbar";
import Container from "@material-ui/core/Container";
import Head from "next/head";
import {SidebarConfigType} from "../../src/types/SidebarConfig";
import {Box} from "@material-ui/core";


interface Props {
    title: string;
    maxWidth: "xl" | false;
    isPublic?: boolean;
    children: React.ReactChild;
    showLogo?: boolean;
    sidebarConfig: SidebarConfigType[];
    is_loading?: boolean
}

const PageLayout: React.FC<Props> = ({title, showLogo, isPublic, is_loading,
                                         maxWidth,
    sidebarConfig,
                                         children
}) => {
    const [isLoading, toggleIsLoading] = useState(is_loading)
    const [ session, loading ] = useSession()

    useEffect(() => toggleIsLoading(is_loading), [is_loading])

    if (loading) {
        return null
    } else if (session || isPublic) {
        return (<>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar sidebarConfig={sidebarConfig} showLogo={showLogo} isLoading={isLoading} title={title} session={session}/>
            <Box mb={8} pt={8}>
                <Container maxWidth={maxWidth}>
                    {children}
                </Container>
            </Box>

        </>)
    } else {
        window.location.href = '/'
        return <></>
    }
}

export default PageLayout

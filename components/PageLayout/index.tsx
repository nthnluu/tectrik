import React, {useState} from "react";
import {useSession} from "next-auth/client";
import Navbar from "./Navbar";
import Container from "@material-ui/core/Container";
import PageContext from "./PageContext";
import Head from "next/head";


interface Props {
    title: string;
    maxWidth: "xl" | false;
    isPublic?: boolean;
    children: React.ReactChild;
}

const PageLayout: React.FC<Props> = ({title, isPublic, maxWidth, children}) => {
    const [isLoading, toggleIsLoading] = useState(false)
    const [ session, loading ] = useSession()

    if (loading) {
        return null
    } else if (session || isPublic) {
        return (<>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar isLoading={isLoading} title={title} session={session}/>
            <Container maxWidth={maxWidth}>
                {children}
            </Container>
        </>)
    } else {
        window.location.href = '/'
        return <></>
    }
}

export default PageLayout

import React, {useState} from "react";
import {useSession} from "next-auth/client";
import Navbar from "./Navbar";

interface Props {
    title: string;
    isPublic?: boolean;
}

const PageLayout: React.FC<Props> = ({title, isPublic}) => {
    const [isLoading, toggleIsLoading] = useState(false)
    const [ session, loading ] = useSession()

    if (loading) {
        return <></>
    } else if (session || isPublic) {
        return (<>
            <Navbar isLoading={isLoading} title={title} session={session}/>
            <div className="mt-24">
                <p>{JSON.stringify(session)}</p>
            </div>
        </>)
    } else {
        window.location.href = '/'
        return <></>
    }
}

export default PageLayout

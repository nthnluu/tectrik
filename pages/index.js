import React from 'react';
import {useSession} from 'next-auth/client'
import CircularProgress from "@material-ui/core/CircularProgress";
import {useRouter} from "next/router";

export default function Index() {
    const [ session, loading ] = useSession()
    const router = useRouter()

    if (loading) {
        return (<div className="h-screen flex justify-center items-center">
            <CircularProgress color="inherit" className="block"/>
        </div>)
    } else if (session) {
        window.location.href = '/dashboard'
    } else {
        router.push('/api/auth/signin')
    }
}


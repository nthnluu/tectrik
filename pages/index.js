import React from 'react';
import {getSession, useSession} from 'next-auth/client'
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useRouter} from "next/router";

export default function Index() {
    const [ session, loading ] = useSession()
    const router = useRouter()

    if (loading) {
        return (<Backdrop open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>)
    } else if (session) {
        window.location.href = '/dashboard'
    } else {
        router.push('/api/auth/signin')
    }
}


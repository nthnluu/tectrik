import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useQuery} from "@apollo/client";
import {AllSearches} from "../src/gql/Search";
import {useRouter} from "next/router";
import {useSession} from "next-auth/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useEffect} from "react";

const LoadingPlaceholder = () => {
    return <div className="text-center mt-12"><CircularProgress/></div>
}

const ListComponent = ({session, toggleLoading}) => {
    toggleLoading(true)
    const router = useRouter()
    const {loading, error, data} = useQuery(AllSearches, {variables: {userId: session.id}});

    useEffect(() => {
        if (!loading) {
            toggleLoading(false)
        }
    })

    if (loading) return <LoadingPlaceholder/>;
    if (error) return `Error! ${error.message}`;



    return (
        <>{data.search.length > 0 ? <Paper className="mt-6">
            <ul className="divide-y">
                {data.search.map(searchObject => <li key={searchObject.id}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button onClick={() => router.push('/search/' + searchObject.id)}>
                            <ListItemText primary={searchObject.title}/>
                        </ListItem>
                    </List>
                </li>)}
            </ul>
        </Paper> : <Box align="center" m={4}>
            <img src="/search_list_placeholder.svg" className="h-48 mb-6"/>
            <Typography color="textSecondary">You haven't created a search yet.</Typography>
        </Box>}</>
    )
}

const SearchList = ({toggleLoading}) => {
    const [session, loading] = useSession()

    if (loading) {
        return <LoadingPlaceholder/>
    } else {
        return <ListComponent toggleLoading={toggleLoading} session={session}/>
    }

}

export default SearchList

import React, {useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HistoryIcon from '@material-ui/icons/History';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {useRouter} from 'next/router'
import LinearProgress from "@material-ui/core/LinearProgress";
import {Avatar} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: 32
        },
        avatarSmall: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1
        },
    }),
);

const SearchBar: React.FC<{}> = () => {
    const [isFocused, toggleFocused] = useState(false)

    return <>
        <div className="hidden md:block">
            <div className={"ml-6 rounded-lg overflow-hidden flex justify-start border transition-all duration-150 " + (isFocused ? "bg-white border-gray-200 shadow" : "bg-gray-200 border-transparent")}>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                <input onFocus={() => toggleFocused(true)} onBlur={() => toggleFocused(false)} placeholder="Search for apps, users, documents, and more" className="p-2 bg-transparent focus:outline-none" style={{width: '28rem'}}/>
            </div>
        </div>
        <div className="hidden">
            <IconButton>
                <SearchIcon/>
            </IconButton>
        </div>

    </>
}
export default function MenuAppBar({isLoading, title, session}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [drawer, toggleDrawer] = useState(false)
    const router = useRouter()


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        toggleDrawer(false)
        setAnchorEl(null);
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" color="inherit" elevation={0} className="border-b border-gray-300">
                    <Toolbar>
                        <IconButton edge="start" onClick={() => toggleDrawer(true)}
                                    className={classes.menuButton + " focus:outline-none"} color="inherit"
                                    aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <div className="flex-grow flex items-center justify-start">
                            <Typography variant="h5">
                                <div className="flex justify-start items-center ">
                                    <img src="https://sheetroom.s3.amazonaws.com/tectriklogo1.png" className="h-6 mr-2"/>
                                    <strong className="tracking-wide text-gray-800">Tectrik</strong>
                                </div>
                            </Typography>
                            <SearchBar/>
                        </div>


                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar className={classes.avatarSmall} alt={session.name} src={session.picture}/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => {
                                    handleClose();
                                    router.push('/api/auth/signout')
                                }}>Sign out</MenuItem>
                            </Menu>
                        </div>

                    </Toolbar>
                    {isLoading ? <LinearProgress/> : null}

                </AppBar>
            </div>

            <Drawer anchor="left" open={drawer} onClose={() => toggleDrawer(false)}>
                <div style={{width: '16rem'}}>
                    <List>
                        <ListItem button onClick={() => {
                            handleClose();
                            router.push('/search')
                        }}>
                            <ListItemIcon><SearchIcon/></ListItemIcon>
                            <ListItemText primary="Create new search"/>
                        </ListItem>
                        <ListItem button onClick={() => {
                            handleClose();
                            router.push('/dashboard')
                        }}>
                            <ListItemIcon><HistoryIcon/></ListItemIcon>
                            <ListItemText primary="Previous searches"/>
                        </ListItem>
                    </List>
                </div>

            </Drawer>

        </>
    );
}

import React, {useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import {useRouter} from 'next/router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LinearProgress from "@material-ui/core/LinearProgress";
import {Avatar} from "@material-ui/core";
import {SidebarConfigType} from "../../src/types/SidebarConfig";

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
        listItem: {
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            "&$selected": {
                color: '#1B67D2',
                backgroundColor: "#E5EFFC",
                "&:hover": {
                    backgroundColor: "#ebf3fd",
                },
            },
        }
    }),
);

const SearchBar: React.FC<{}> = () => {
    const [isFocused, toggleFocused] = useState(false)

    return <>
        <div className="hidden md:block">
            <div
                className={"ml-6 rounded-lg overflow-hidden flex justify-start border transition-all duration-150 " + (isFocused ? "bg-white border-gray-200 shadow" : "bg-light-gray-bg border-transparent")}>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                <input onFocus={() => toggleFocused(true)} onBlur={() => toggleFocused(false)} placeholder="Search"
                       spellCheck="false" className="p-2 bg-transparent focus:outline-none text-lg font-light"
                       style={{width: '28rem'}}/>
            </div>
        </div>
        <div className="hidden">
            <IconButton>
                <SearchIcon/>
            </IconButton>
        </div>

    </>
}

const defaultSidebar = [
    {
        label: 'Dashboard',
        icon: <HomeIcon color="primary"/>,
        selected: true,
        link: '/'
    },
    {
        label: 'Porn Locker',
        icon: <FavoriteIcon/>,
        selected: false,
        link: '/porn'
    },
    {
        label: 'Meal Planner',
        icon: <FastfoodIcon/>,
        selected: false,
        link: '/meals'
    },
    {
        label: 'Workout Tracker',
        icon: <FitnessCenterIcon/>,
        selected: false,
        link: '/porn'
    }
]

interface Props {
    isLoading: boolean;
    title: string;
    session: any;
    showLogo: boolean;
    sidebarConfig: SidebarConfigType[]
}

const Navbar: React.FC<Props> = ({isLoading, title, session, showLogo, sidebarConfig = defaultSidebar}) => {
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

    // @ts-ignore
    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" color="inherit" elevation={0} className="border-b border-light-gray">
                    <Toolbar>
                        <IconButton edge="start" onClick={() => toggleDrawer(true)}
                                    className={classes.menuButton + " focus:outline-none"} color="inherit"
                                    aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <div className="flex-grow flex items-center justify-start">
                            <Typography variant="h5">
                                <div className="flex justify-start items-center text-gray-800">
                                    {showLogo ? <> <img src="https://sheetroom.s3.amazonaws.com/tectriklogo1.png"
                                                        className="h-6 mr-1"/>
                                        Tectrik</> : title}

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
                <div style={{width: '18rem'}} className="pr-2">
                    <List className="space-y-1 relative h-full">
                        {/*// @ts-ignore*/}
                        {sidebarConfig.map(item => <ListItem button className={classes.listItem}
                                                             selected={item.selected} onClick={() => {
                            handleClose();
                            router.push(item.link)
                        }}>
                            <ListItemIcon color="primary">{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </ListItem>)}

                        {sidebarConfig ? <ListItem button onClick={() => {
                            handleClose();
                            router.push('/dashboard')
                        }}>
                            <ListItemIcon><ArrowBackIcon/></ListItemIcon>
                            <ListItemText primary="Return to Dashboard"/>
                        </ListItem> : null}

                    </List>
                </div>

            </Drawer>

        </>
    );
}

export default Navbar

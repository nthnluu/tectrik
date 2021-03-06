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
import {Avatar, Slide, useScrollTrigger} from "@material-ui/core";
import {SidebarConfigType} from "../../src/types/SidebarConfig";
import DescriptionIcon from '@material-ui/icons/Description';
import AccessTimeIcon from "@material-ui/icons/AccessTime";

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
            "&.Mui-selected": {
                color: '#1B67D2',
                backgroundColor: "#E5EFFC",
                "&:hover": {
                    backgroundColor: "#ebf3fd",
                },
            }
        }
    }),
);

const SearchBar: React.FC<{}> = () => {
    const [isFocused, toggleFocused] = useState(false)

    return <>
        <div className="hidden md:block">
            <div
                className={"ml-6 rounded-lg overflow-hidden flex justify-start transition-all duration-150 " + (isFocused ? "bg-white activeSearch" : "bg-light-gray-bg border-transparent")}>
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
        label: 'Resumes',
        icon: <DescriptionIcon/>,
        selected: false,
        link: '/resumes'
    },
    {
        label: 'Countdowns',
        icon: <AccessTimeIcon/>,
        selected: false,
        link: '/countdowns'
    }
]

interface Props {
    isLoading: boolean;
    title: string;
    session: any;
    showLogo: boolean;
    sidebarConfig: SidebarConfigType[]
}


function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 18 : 0,
    });
}
const Navbar: React.FC<Props> = ({isLoading, title, session, showLogo, sidebarConfig}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [drawer, toggleDrawer] = useState(false)
    const router = useRouter()


    const currentSidebar = sidebarConfig ? sidebarConfig : defaultSidebar
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

                <ElevationScroll>
                    <AppBar position="fixed" color="inherit" elevation={0}
                            className={`border-light-gray ${!isLoading ? "border-b" : ""}`}>
                        <Toolbar>
                            <IconButton edge="start" onClick={() => toggleDrawer(true)}
                                        className={classes.menuButton + " focus:outline-none"} color="inherit"
                                        aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <div className="flex-grow flex items-center justify-start">
                                <Typography variant="h5">
                                    <div
                                        className={`flex justify-start items-center text-gray-800 ${!sidebarConfig ? "font-semibold" : ""}`}>
                                        {showLogo ? <> <img
                                            src="https://sheetroom.s3.amazonaws.com/tectriklogo1.png"
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
                                    <Avatar className={classes.avatarSmall} alt={session.name}
                                            src={session.picture}/>
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
                </ElevationScroll>


            </div>

            <Drawer anchor="left" open={drawer} onClose={() => toggleDrawer(false)}>
                <div style={{width: '18rem'}} className="pr-2">
                    <List className="space-y-1 relative h-full">
                        {/*// @ts-ignore*/}
                        {currentSidebar.map(item => <ListItem button className={classes.listItem}
                                                              selected={item.selected} onClick={() => {
                            handleClose();
                            router.push(item.link)
                        }}>
                            <ListItemIcon color="primary">{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </ListItem>)}

                        {sidebarConfig ? <ListItem className={classes.listItem} button onClick={() => {
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

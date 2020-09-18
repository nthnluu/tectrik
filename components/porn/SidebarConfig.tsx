import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import ExploreIcon from '@material-ui/icons/Explore';
import AppsIcon from '@material-ui/icons/Apps';
import FavoriteIcon from '@material-ui/icons/Favorite';

export const SidebarConfig = (selected) => {
    return [
        {
            label: 'My Library',
            icon: <AppsIcon color={selected === 'library' ? "primary" : "inherit"}/>,
            selected: selected === 'library',
            link: '/porn'
        },
        {
            label: 'Discover',
            icon: <ExploreIcon color={selected === 'discover' ? "primary" : "inherit"}/>,
            selected: selected === 'discover',
            link: '/porn/discover'
        },
        {
            label: 'My Preferences',
            icon: <FavoriteIcon color={selected === 'preferences' ? "primary" : "inherit"}/>,
            selected: selected === 'preferences',
            link: '/porn/preferences'
        }
    ]
}

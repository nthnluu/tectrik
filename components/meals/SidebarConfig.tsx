import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import ExploreIcon from '@material-ui/icons/Explore';
import AppsIcon from '@material-ui/icons/Apps';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import TimelineIcon from '@material-ui/icons/Timeline';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export const SidebarConfig = (selected) => {
    return [
        {
            label: 'Weekly Plan',
            icon: <ViewWeekIcon color={selected === 'week' ? "primary" : "inherit"}/>,
            selected: selected === 'week',
            link: '/meals'
        },
        {
            label: 'My Goals',
            icon: <TimelineIcon color={selected === 'goals' ? "primary" : "inherit"}/>,
            selected: selected === 'goals',
            link: '/porn/goals'
        },
        {
            label: 'Shopping List',
            icon: <ShoppingCartIcon color={selected === 'list' ? "primary" : "inherit"}/>,
            selected: selected === 'list',
            link: '/porn/list'
        }
    ]
}

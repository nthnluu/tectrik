import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import ExploreIcon from '@material-ui/icons/Explore';
import AppsIcon from '@material-ui/icons/Apps';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import TimelineIcon from '@material-ui/icons/Timeline';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export const SidebarConfig = (selected) => {
    function getColor(current) {
        return (current === selected) ? "primary" : "inherit"
    }


    return [
        {
            label: 'My R',
            icon: <ViewWeekIcon color={getColor('week')} />,
            selected: selected === 'week',
            link: '/meals'
        },
        {
            label: 'My Goals',
            icon: <TimelineIcon color={getColor('goals')}/>,
            selected: selected === 'goals',
            link: '/porn/goals'
        },
        {
            label: 'Shopping List',
            icon: <ShoppingCartIcon color={getColor('list')}/>,
            selected: selected === 'list',
            link: '/porn/list'
        }
    ]
}

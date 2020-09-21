import React from "react";
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import TimelineIcon from '@material-ui/icons/Timeline';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import getColor from "../../src/GetSidebarColor";

export const SidebarConfig = (selected) => {

    return [
        {
            label: 'My R',
            icon: <ViewWeekIcon color={getColor('week', selected)} />,
            selected: selected === 'week',
            link: '/meals'
        },
        {
            label: 'My Goals',
            icon: <TimelineIcon color={getColor('goals', selected)}/>,
            selected: selected === 'goals',
            link: '/porn/goals'
        },
        {
            label: 'Shopping List',
            icon: <ShoppingCartIcon color={getColor('list', selected)}/>,
            selected: selected === 'list',
            link: '/porn/list'
        }
    ]
}

import React from "react";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export const SidebarConfig = (selected) => {
    function getColor(current) {
        return (current === selected) ? "primary" : "inherit"
    }


    return [
        {
            label: 'My Countdowns',
            icon: <AccessTimeIcon color={getColor('countdowns')} />,
            selected: selected === 'countdowns',
            link: '/countdowns'
        }
    ]
}

import React from "react";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import getColor from "../../src/GetSidebarColor";

export const SidebarConfig = (selected) => {

    return [
        {
            label: 'My Countdowns',
            icon: <AccessTimeIcon color={getColor('countdowns', selected)} />,
            selected: selected === 'countdowns',
            link: '/countdowns'
        }
    ]
}

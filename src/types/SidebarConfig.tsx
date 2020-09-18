import React from "react";

export interface SidebarConfigType {
    label: string;
    icon: React.ReactNode;
    selected: boolean;
    link: string;
}

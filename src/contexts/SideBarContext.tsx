import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';

export const SideBar = createContext({} as SideBarRype);

type SideBarRype = {
    itens: {
        key: string,
        text: string,
        path: string,
        icon: any
    }[],
    activatedKey: string,
    setActivatedKey: Dispatch<SetStateAction<string>>
}

type SideBarComponentProps = {
    children: ReactNode
}

const sideBarOptions = [
    {
        key: 'dash',
        text: 'Dashboard',
        path: '/',
        icon: <HomeIcon />
    },
    {
        key: 'boards',
        text: 'Kanban Boards',
        path: '/boards',
        icon: <DashboardIcon />
    },
    {
        key: 'squads',
        text: 'Squads',
        path: '/squad',
        icon: <GroupsIcon />
    },
    {
        key: 'reports',
        text: 'Reports',
        path: '/reports',
        icon: <AssessmentIcon />
    }
];

export function SideBarContext(props: SideBarComponentProps) {

    const [itens, setItens] = useState(sideBarOptions );
    const [activatedKey, setActivatedKey] = useState('');

    return (
        <SideBar.Provider value={{ itens, activatedKey, setActivatedKey }}>
            {props.children}
        </SideBar.Provider>
    );
}
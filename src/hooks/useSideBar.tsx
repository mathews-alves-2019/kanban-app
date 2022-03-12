import { useContext } from 'react';
import { SideBar } from '../contexts/';

export function useSideBar() {
    return useContext(SideBar);
}
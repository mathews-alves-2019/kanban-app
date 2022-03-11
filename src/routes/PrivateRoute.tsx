import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { SideBar } from '../components/Drawer';
import { TopBar } from '../components/TopBar';
import { useAuth } from '../hooks/useAuth';

export function PrivateRoute() {
    const { user } = useAuth();
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const wrapperRef = useRef(null);

    const handleClickOutside = (event: Event, ref: any, isSmDown: boolean) => {
        if (ref.current && !ref.current.contains(event.target) && open && isSmDown) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if(smDown) {
            document.addEventListener("mousedown", (event) => handleClickOutside(event, wrapperRef, smDown), true);
            setOpen(false);
        }
    }, [smDown])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return user ? (
        <Grid>
            <TopBar open={ open } handleDrawerOpen={ handleDrawerOpen } smDown={ smDown }/>
            <SideBar open={ open } handleDrawerClose={ handleDrawerClose } wrapperRef={ wrapperRef }/>
            <Outlet />
        </Grid>
    ) : <Navigate to="/login" />;
}
import { Box, Container, Grid, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { FacebookCircularProgress } from '../components/CircularProgress';
import { SideBar } from '../components/Drawer';
import { TopBar } from '../components/TopBar';
import { SideBarContext } from '../contexts';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';

export function PrivateRoute() {
    const { user } = useAuth();
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const wrapperRef = useRef(null);
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const { loading } = useLoading();

    const handleClickOutside = (event: Event, ref: any, isSmDown: boolean) => {
        if (ref.current && !ref.current.contains(event.target) && open && isSmDown) {
            setOpen(false);
        }
    };

    useEffect(() => {

        if (smDown || mdDown) {
            document.addEventListener("mousedown", (event) => handleClickOutside(event, wrapperRef, smDown || mdDown), true);
            setOpen(false);
        }
    }, [smDown, mdDown])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return user ? (
        <>
            {loading ?
                (
                    <Container component="main" maxWidth="xs">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <FacebookCircularProgress size={100} sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100vw',
                                height: '100vh'
                            }} />
                        </Box>
                    </Container>
                )
                : <Box sx={{ display: 'flex' }}>
                    <SideBarContext>
                        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} smDown={smDown} mdDown={mdDown} />
                        <SideBar open={open} handleDrawerClose={handleDrawerClose} wrapperRef={wrapperRef} />
                        <Box component="main"
                            sx={{
                                flexGrow: 1,
                                height: '100vh',
                                width: '100vw',
                                overflow: 'auto',
                            }} >
                            <Toolbar />
                            <Container >
                                <Grid container spacing={1} sx={{ width: '100%', height: '100%', mt: '10px', ml: '10px' }}>
                                    <Outlet />
                                </Grid>
                            </Container>
                        </Box>
                    </SideBarContext>

                </Box >}
        </>
    ) : <Navigate to="/login" />;
}
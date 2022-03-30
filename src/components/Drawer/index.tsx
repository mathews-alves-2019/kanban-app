import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Divider, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSideBar } from '../../hooks/useSideBar';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import { useAuth } from '../../hooks/useAuth';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: any) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

type SideBarProps = {
    open: boolean,
    handleDrawerClose: () => void,
    wrapperRef: React.MutableRefObject<null>,
}

export function SideBar({ open, handleDrawerClose, wrapperRef }: SideBarProps) {
    const theme = useTheme();
    const { itens, activatedKey, setActivatedKey } = useSideBar();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const navigate = useNavigate();

    const { user } = useAuth();

    const menuId = 'squads-list';

    function handleNavigate(path: string, key: string) {
        navigate(path);
        setActivatedKey(key);
    }

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Drawer variant="permanent" open={open} ref={wrapperRef} >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ pt: 0 }}>
                    <ListItem selected={activatedKey === 'item.key'}
                        key={'item.key'}
                        sx={{
                            pt: 2,
                            pb: 2,
                            minHeight: 48,
                            justifyContent: open ? 'right' : 'center',
                            px: 2.5,
                        }}
                    >
                        {open ? <Box sx={{
                            display: 'flex',
                            width: '100%',
                            background: 'rgba(63, 81, 181, 0.08)',
                            borderRadius: '10px'
                        }}>
                            <Box sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '11px 24px'
                            }}>
                                <ListItemText sx={{ opacity: open ? 1 : 0, marginRight: '30px', marginLeft: '10px' }} >
                                    <div>
                                        <Typography variant="subtitle1" gutterBottom component="h3">
                                            Squads
                                        </Typography>
                                        <Typography variant="body2" gutterBottom component="p">
                                            {
                                                user?.userSquads.filter((squad: any) => {
                                                    return squad.selectedLastTime === true;
                                                })[0].name
                                            }
                                        </Typography>
                                    </div>
                                </ListItemText>
                            </Box>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {<Button onClick={e => handleProfileMenuOpen(e)}> <UnfoldMoreIcon /> </Button>}
                            </ListItemIcon>
                        </Box> :
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                {<Button onClick={e => handleProfileMenuOpen(e)}> <UnfoldMoreIcon /> </Button>}
                            </ListItemIcon>}
                    </ListItem>
                    <Divider />
                    {itens.map((item: any) => (
                        <ListItemButton selected={activatedKey === item.key}
                            key={item.key}
                            onClick={() => handleNavigate(item.path, item.key)}
                            sx={{
                                pt: 2,
                                pb: 2,
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            {
                <Menu
                    PaperProps={{
                        style: {
                            width: 200,
                            marginLeft: 4
                        },
                    }}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',

                    }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}

                >
                    {user?.userSquads.map((squad: any) => {
                        return (
                            <MenuItem >
                                <ListItemIcon>
                                    <GroupsIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText>{squad.name}</ListItemText>
                            </MenuItem>
                        )
                    })}
                </Menu>
            }
        </>
    );
}
import { Box, Button, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import GroupsIcon from '@mui/icons-material/Groups';

import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useLoading } from '../../hooks/useLoading';
import SquadService from '../../services/SquadService';

type SelectSquadItemProps = {
    open: boolean,
}

export default function SelectSquadItem({ open }: SelectSquadItemProps) {

    const { user, updateUser } = useAuth();
    const menuId = 'squads-list';
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const { showLoading, hideLoading } = useLoading();

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    async function updateSelectedSquad(squad: any) {
        showLoading();

        await SquadService.updateSelectedSquad(squad.id).then(async () => {
            await updateUser();
            hideLoading();
        });
    }

    return (
        <>
            <ListItem key={'item.key'}
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
            {
                <Menu
                    PaperProps={{
                        style: {
                            width: 200,
                            marginLeft: 4,
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
                            <MenuItem onClick={() => updateSelectedSquad(squad)}>
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
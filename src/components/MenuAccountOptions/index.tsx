import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

type MenuAccountOptionsProps = {
    anchorEl: null | HTMLElement;
    menuId: string;
    setAnchorEl: (value: null | HTMLElement) => void;
    isMenuOpen: boolean;
}

export function MenuAccountOptions({ anchorEl, menuId, setAnchorEl, isMenuOpen }: MenuAccountOptionsProps) {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleAccountPage = () => {
        handleMenuClose();
        navigate('/account');
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleLogOut() {
        auth.logout();
    }

    return (
        <Menu
            PaperProps={{
                style: {
                    width: 170,
                },
            }}
            sx={{ mt: '40px' }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleAccountPage} >
                <ListItemIcon>
                    <AccountCircle color="primary" />
                </ListItemIcon>
                <ListItemText>My account</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                    <Logout color="error"/>
                </ListItemIcon>
                <ListItemText>Logoff</ListItemText>
            </MenuItem>
        </Menu>
    );
}
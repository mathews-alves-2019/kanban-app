import { Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

type MenuAccountOptionsProps = {
    anchorEl: null | HTMLElement;
    menuId: string;
    setAnchorEl : (value: null | HTMLElement) => void;
    isMenuOpen: boolean;
}

export function MenuAccountOptions({ anchorEl, menuId, setAnchorEl, isMenuOpen }: MenuAccountOptionsProps) {
    const auth = useAuth();

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleLogOut() {
        auth.logout();
    }

    return (
        <Menu
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleLogOut}>Logoff</MenuItem>
        </Menu>
    );
}
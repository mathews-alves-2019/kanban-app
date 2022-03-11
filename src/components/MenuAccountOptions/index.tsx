import { Menu, MenuItem } from "@mui/material";

type MenuAccountOptionsProps = {
    anchorEl: null | HTMLElement;
    menuId: string;
    setAnchorEl : (value: null | HTMLElement) => void;
    isMenuOpen: boolean;
}

export function MenuAccountOptions({ anchorEl, menuId, setAnchorEl, isMenuOpen }: MenuAccountOptionsProps) {

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
}
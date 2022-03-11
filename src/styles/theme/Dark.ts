import { createTheme } from '@mui/material';
import { typography, shape } from '../utils';

const themeOptions = {
    palette: {
        primary: {
            main: '#8257e5',
            dark: '#471ea6',
            light: '#8150f2',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#8257e5',
            dark: '#007a78',
            light: '#00f5f1',
            contrastText: '#ffffff',
        },
        background: {
            default: '#16001e',
            paper: '#303134',
        },
        text: {
            primary: '#8257e5'
        },
    },
    typography,
    shape
}

export const DarkTheme = createTheme(themeOptions);
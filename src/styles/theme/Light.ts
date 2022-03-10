import { createTheme } from '@mui/material';
import { typography } from '../utils';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#00a8e0',
            dark: '#004d66',
            light: '#006b8f',
            contrastText: '#fff',
        },
        secondary: {
            main: '#006b8f',
            dark: '#34305f',
            light: '#637381',
            contrastText: '#fff',
        },
        background: {
            default: '#f7f6f3',
            paper: '#ffffff',
        }
    },
    typography
});
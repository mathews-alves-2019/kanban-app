import { createTheme } from '@mui/material';
import { typography, shape } from '../utils';

const themeOptions = {
    palette: {
        type: 'dark',
        primary: {
            main: '#130820',
            light: '#4b3473',
            dark: '#290f39',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#8239c7',
            light: '#b363ff',
            dark: '#7c12a4',
            contrastText: '#ffffff',
        },
        background: {
            default: '#2b093b',
            paper: '#401058',
        },
        text: {
            primary: 'rgba(247,245,245,0.88)',
            secondary: 'rgba(201,172,230,0.72)',
            disabled: 'rgba(122,114,142,0.41)',
        },
        error: {
            main: '#f44336',
            light: '#f6685e',
            dark: '#aa2e25',
            contrastText: '#ffffff',
        },
        divider: 'rgba(150,148,148,0.12)',
        success: {
            main: '#4c6caf',
            light: '#6f89bf',
            dark: '#354b7a',
            contrastText: '#ffffff',
        },
        info: {
            main: '#2196f3',
            light: '#4dabf5',
            dark: '#1769aa',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ff9800',
            light: '#ffac33',
            dark: '#b26a00',
            contrastText: 'rgba(0,0,0,0.87)',
        },
    },
    typography,
    shape,
    components: {
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#8239c7',
                },
              },
        }
    }
}

export const DarkTheme = createTheme(themeOptions);
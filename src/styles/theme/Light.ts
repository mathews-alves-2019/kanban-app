import { createTheme, ThemeOptions } from '@mui/material';
import { typography, shape } from '../utils';

export const LightTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#0075f5',
      dark: '#2c387e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2A4F77',
      light: '#609AD6',
      dark: '#0075F5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#efeaea',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0,0,0,0.88)',
      secondary: 'rgba(0,0,0,0.55)',
      disabled: 'rgba(0,0,0,0.38)',
    },
    error: {
      main: '#f44336',
      light: '#f6685e',
      dark: '#aa2e25',
      contrastText: '#ffffff',
    },
    divider: 'rgba(0,0,0,0.12)',
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
});

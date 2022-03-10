import { useCallback, useMemo, useState } from 'react';
import { ThemeProvider, Box } from '@mui/material';
import { LightTheme, DarkTheme } from './theme';
import { ThemeContext } from '../contexts/ThemeContext';

export const AppThemeProvider: React.FC = ({children}) => {
    const [ themeName, setThemeName ] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName(themeName === 'light' ? 'dark' : 'light');
    }, [themeName]);

    const theme = useMemo(() => {
        if(themeName === 'light') return LightTheme;

        return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={ theme }>
                <Box width="100vw" height="100vh" 
                    bgcolor={theme.palette.background.default}>
                    { children }
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

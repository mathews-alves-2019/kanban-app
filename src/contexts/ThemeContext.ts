import { createContext, useContext } from 'react';

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme : () => void;
}

export const ThemeContext = createContext({ } as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
};
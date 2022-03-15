import { Box, Button, Container, Grid, Paper, Toolbar } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppThemeContext } from "../contexts";
import { useSideBar } from "../hooks/useSideBar";

type HomeProps = {
    children?: ReactNode;
}

export function Home({ children }: HomeProps) {
    const { setActivatedKey } = useSideBar();
    const { toggleTheme } = useAppThemeContext();

    useEffect(() => {
        setActivatedKey('dash');
    });

    return (
        <Button variant='contained'
            color='primary' onClick={toggleTheme}>Toggle Theme</Button>
    )
}
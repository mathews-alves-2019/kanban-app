import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSideBar } from "../hooks/useSideBar";

type HomeProps = {
    children?: ReactNode;
}

export function Home({ children }: HomeProps) {
    const { setActivatedKey } = useSideBar();

    useEffect(() => {
        setActivatedKey('dash');
    });

    return (
        <h1>home</h1>
    )
}
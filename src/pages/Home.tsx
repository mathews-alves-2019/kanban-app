import { Grid } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type HomeProps = {
    children?: ReactNode;
}

export function Home({ children }: HomeProps) {
    return (
        <Grid container component="main" >
            <Link to="/teste">teste</Link>
            {children}
        </Grid>
    )
}
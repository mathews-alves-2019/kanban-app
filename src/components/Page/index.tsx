import { Helmet } from 'react-helmet-async';
import { ReactNode } from 'react';
import { Box } from '@mui/material';

type PageProps = {
    children?: ReactNode;
    title: string
}

export function Page({ children, title, ...other }: PageProps) {

    return (
        <Box {...other}>
            <Helmet>
                <title>
                    {title}
                </title>
            </Helmet>
            {children}
        </Box>
    )
}
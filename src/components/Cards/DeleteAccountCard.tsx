import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, styled, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const DeleteButton = styled(Button)(({ theme }) => ({
    borderColor: "#ff0000",
    color: "#ff0000",
    '&:hover': {
        borderColor: "#d20404",
        backgroundColor: "#ffdfdf",
    }
}));

export function DeleteAccountCard() {
    const { user } = useAuth();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card sx={{ marginTop: 3 }}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={3} md={4} sx={{ marginTop: 2, }}>
                        <Typography variant="h6" component="span">Delete account</Typography>
                    </Grid>
                    <Grid xs={12} container
                        lg={9} md={8} sx={{ paddingLeft: smDown ? 1 : 5, marginTop: 3.5, paddingRight: smDown ? 3 : 12, }} item>
                        <Typography variant="subtitle2" gutterBottom component="div">Delete your account and all of your source data. This is irreversible.</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'right', display: 'flex', paddingLeft: 5, paddingRight: smDown ? 3 : 12, paddingBottom: 2.5 }}>
                <DeleteButton variant="outlined" size="small" >Delete account</DeleteButton>
            </CardActions>
        </Card>
    );
}
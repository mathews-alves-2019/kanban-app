import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, styled, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    height: '0.4375em',
}));

export function BasicDetailsCard() {
    const { user } = useAuth();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={3} md={4} sx={{ marginTop: 2, }}>
                        <Typography variant="h6" component="span">Basic details</Typography>
                    </Grid>
                    <Grid xs={12} container direction="row"
                        justifyContent="space-evenly"
                        alignItems="stretch"
                        lg={9} md={8} sx={{ paddingLeft: smDown ? 1 : 5, paddingRight: smDown ? 1 : 10, minHeight: 300 }}>
                        <Grid item xs={12} sx={{ marginTop: 2, }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Avatar alt={user?.name} src={user?.avatar} sx={{ width: '4em', height: '4em' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <StyledTextField id="user-position" label="Position" color="primary" variant="outlined" defaultValue={user?.position} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 3 }}>
                            <StyledTextField id="user-name" label="Name" variant="outlined" color="primary" defaultValue={user?.name} disabled />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 3 }}>
                            <StyledTextField id="user-email" label="Email" variant="outlined" color="primary" defaultValue={user?.email} disabled />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'right', display: 'flex', paddingLeft: 5, paddingRight: smDown ? 3 : 12, paddingBottom: 2.5 }}>
                <Button variant="contained" size="small" sx={{ backgroundColor: 'primary.light'}} >Salvar</Button>
            </CardActions>
        </Card>
    );
}
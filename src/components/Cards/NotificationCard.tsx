import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, FormControlLabel, FormGroup, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, Switch, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";

export function NotificationCard() {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const [isEmailNotificationSwitchChecked, setIsEmailNotificationSwitchChecked] = useState(true);

    useEffect(() => {
        console.log(isEmailNotificationSwitchChecked)
    }, [isEmailNotificationSwitchChecked])

    return (
        <Card sx={{ marginTop: 1 }}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={3} md={4} sx={{ marginTop: 2, }}>
                        <Typography variant="h6" component="span">Basic details</Typography>
                    </Grid>
                    <FormGroup>
                        <Grid xs={12} container direction="row"
                            justifyContent="space-evenly"
                            alignItems="stretch"
                            lg={9} md={8} sx={{
                                paddingLeft: smDown ? 1 : 1, paddingRight: smDown ? 1 : 0, minHeight: 300, minWidth: '100%', display: 'inline',
                                width: smDown ? '' : '700px'
                            }} item>
                            <Grid item >
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    minHeight: '40px',
                                    alignItems: 'center',
                                    marginTop: 2
                                }} >
                                    <Grid md={10} sm={12} xs={12} lg={11} sx={{ width: '100%' }} item>
                                        <Typography variant="subtitle2" >
                                            Email notifications
                                        </Typography>
                                        <Typography variant="body2" component="p" >Send the invite link for a member to join to your team.</Typography>
                                    </Grid>
                                    <Grid md={2} sm={12} xs={12} lg={1} item>
                                        <Switch defaultChecked onChange={(event) => setIsEmailNotificationSwitchChecked(event.target.checked)} />
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={12} >
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    minHeight: '40px',
                                    alignItems: 'center',
                                    marginTop: 2
                                }} >
                                    <Grid md={10} sm={12} xs={12} lg={11} sx={{ width: '100%' }} item>
                                        <Typography variant="subtitle2" >
                                            Email notifications
                                        </Typography>
                                        <Typography variant="body2" component="p" >Send the invite link for a member to join to your team.</Typography>
                                    </Grid>
                                    <Grid md={2} sm={12} xs={12} lg={1} item>
                                        <Switch defaultChecked onChange={(event) => setIsEmailNotificationSwitchChecked(event.target.checked)} />
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: 3 }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    minHeight: '40px',
                                    alignItems: 'center',
                                    marginTop: 2
                                }} >
                                    <Grid md={10} sm={12} xs={12} lg={11} sx={{ width: '100%' }} item>
                                        <Typography variant="subtitle2" >
                                            Email notifications
                                        </Typography>
                                        <Typography variant="body2" component="p" >Send the invite link for a member to join to your team.</Typography>
                                    </Grid>
                                    <Grid md={2} sm={12} xs={12} lg={1} item>
                                        <Switch defaultChecked onChange={(event) => setIsEmailNotificationSwitchChecked(event.target.checked)} />
                                    </Grid>
                                </Box>

                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: 3 }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    minHeight: '40px',
                                    alignItems: 'center',
                                    marginTop: 2
                                }} >
                                    <Grid md={10} sm={12} xs={12} lg={11} sx={{ width: '100%' }} item>
                                        <Typography variant="subtitle2" >
                                            Email notifications
                                        </Typography>
                                        <Typography variant="body2" component="p" >Send the invite link for a member to join to your team.</Typography>
                                    </Grid>
                                    <Grid md={2} sm={12} xs={12} lg={1} item>
                                        <Switch defaultChecked onChange={(event) => setIsEmailNotificationSwitchChecked(event.target.checked)} />
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </Grid>
            </CardContent >
        </Card >
    );
}
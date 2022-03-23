import { Avatar, Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, FormControlLabel, FormGroup, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, Switch, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import UserService from "../../services/UserService";

export function NotificationCard() {
    const theme = useTheme();
    const { user, setUserNotification } = useAuth();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const [showLoadingForReceiveOption, setShowLoadingForReceiveOption] = useState(false);
    const [showLoadingForReceiveActivityAlerts, setShowLoadingForReceiveActivityAlerts] = useState(false);
    const [showLoadingForReceiveBoardsUpdate, setShowLoadingForReceiveBoardsUpdate] = useState(false);
    const [showLoadingForReceiveCardsUpdate, setShowLoadingForReceiveCardsUpdate] = useState(false);
    const [showLoadingForReceiveSprintAlerts, setShowLoadingForReceiveSprintAlerts] = useState(false);

    async function updateReceiveInvitesOption(value: boolean) {
        setShowLoadingForReceiveOption(true);
        await UserService.updateReceiveOption(value, user, "receiveInvites").then(result => {
            setUserNotification(result.data.data.notifications);
            setShowLoadingForReceiveOption(false);
        });
    }

    async function updateBoardsUpdateOption(value: boolean) {
        setShowLoadingForReceiveBoardsUpdate(true);
        await UserService.updateReceiveOption(value, user, "receiveBoardsUpdate").then(result => {
            setUserNotification(result.data.data.notifications);
            setShowLoadingForReceiveBoardsUpdate(false);
        });
    }

    async function updateActivityAlertsOption(value: boolean) {
        setShowLoadingForReceiveActivityAlerts(true);
        await UserService.updateReceiveOption(value, user, "receiveActivityAlerts").then(result => {
            setUserNotification(result.data.data.notifications);
            setShowLoadingForReceiveActivityAlerts(false);
        });
    }

    async function updateCardsUpdateOption(value: boolean) {
        setShowLoadingForReceiveCardsUpdate(true);
        await UserService.updateReceiveOption(value, user, "receiveCardsUpdate").then(result => {
            setUserNotification(result.data.data.notifications);
            setShowLoadingForReceiveCardsUpdate(false);
        });
    }

    async function updateSprintAlertsOption(value: boolean) {
        setShowLoadingForReceiveSprintAlerts(true);
        await UserService.updateReceiveOption(value, user, "receiveSprintAlerts").then(result => {
            setUserNotification(result.data.data.notifications);
            setShowLoadingForReceiveSprintAlerts(false);
        });
    }

    useEffect(() => {
        console.log(user)
    }, [user]);

    return (
        <Card sx={{ marginTop: 1 }}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={3} md={4} sx={{ marginTop: 2, }}>
                        <Typography variant="h6" component="span">Emails notifications</Typography>
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
                                            Invites
                                        </Typography>
                                        <Typography variant="body2" component="p" >Receive the invite link to join to a team.</Typography>
                                    </Grid>
                                    <Grid md={2} sm={12} xs={12} lg={1} item>
                                        {showLoadingForReceiveOption ? <CircularProgress /> :
                                            <Switch checked={user?.notifications.receiveInvites} onChange={(event) => updateReceiveInvitesOption(event.target.checked)} />
                                        }
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
                                            Cards update
                                        </Typography>
                                        <Typography variant="body2" component="p" >When someone changes a card assigned to you.</Typography>
                                    </Grid>
                                    <Grid md={2} sm={12} xs={12} lg={1} item>
                                        {showLoadingForReceiveCardsUpdate ? <CircularProgress /> :
                                            <Switch checked={user?.notifications.receiveCardsUpdate} onChange={(event) => updateCardsUpdateOption(event.target.checked)} />}
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
                                            Boards update
                                        </Typography>
                                        <Typography variant="body2" component="p" >Receive all changes on boards you are a member of.</Typography>
                                    </Grid>
                                    <Grid md={2} sm={12} xs={12} lg={1} item>
                                        {showLoadingForReceiveBoardsUpdate ? <CircularProgress /> :
                                            <Switch checked={user?.notifications.receiveBoardsUpdate} onChange={(event) => updateBoardsUpdateOption(event.target.checked)} />
                                        }
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
                                            Sprints
                                        </Typography>
                                        <Typography variant="body2" component="p" >When a sprint is coming to an end.</Typography>
                                    </Grid>
                                    <Grid md={2} sm={12} xs={12} lg={1} item>
                                        {showLoadingForReceiveSprintAlerts ? <CircularProgress /> :
                                            <Switch checked={user?.notifications.receiveSprintAlerts} onChange={(event) => updateSprintAlertsOption(event.target.checked)} />
                                        }
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
                                            Activity
                                        </Typography>
                                        <Typography variant="body2" component="p" >When an activity is reaching its estimate.</Typography>
                                    </Grid>
                                    <Grid md={2} sm={12} xs={12} lg={1} item>
                                        {showLoadingForReceiveActivityAlerts ? <CircularProgress /> :
                                            <Switch checked={user?.notifications.receiveActivityAlerts} onChange={(event) => updateActivityAlertsOption(event.target.checked)} />

                                        }
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
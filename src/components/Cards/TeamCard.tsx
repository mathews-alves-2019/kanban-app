import { Box, Button, Card, CardContent, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, SelectChangeEvent, styled, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import validator from 'validator';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ProfileService from "../../services/ProfileService";

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "80%",
}));

type ObjectInvite = {
    email: string,
    role: string
}

export function TeamCard() {
    const icon = <Button sx={{ display: 'contents' }} onClick={handleAddEmail}><AddCircleIcon /></Button>;
    const [objectInviteList, setObjectInviteList] = useState<ObjectInvite[]>([]);
    const [email, setEmail] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(false);
    const { user } = useAuth();
    const inviteLink = `${window.location.host}/invite/${user!.userSquads.filter((squad: any) => {
        return squad.selectedLastTime === true;
    })[0].id}`;

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        async function getProfiles() {
            const profilesList = await ProfileService.getProfiles().then((response: any) => {
                return response.data;
            });

            setProfiles(profilesList);
        }
        getProfiles();
    }, []);

    function handleAddEmail() {
        console.log('opa')
        if (validator.isEmail(email)) {

            setObjectInviteList(oldList => [...oldList, { email: email, role: '' }]);
            setError(false);
            console.log('opa3')
            console.log(objectInviteList)
            return;
        }
        console.log('opa2')
        setError(true);
    }

    const handleChange = (object: ObjectInvite, event: SelectChangeEvent) => {
        console.log(object)
        console.log(event.target.value)
        setObjectInviteList([...objectInviteList].map(stateObject => {
            if (stateObject.email === object.email) {
                return {
                    ...stateObject,
                    role: event.target.value
                }
            } else return stateObject;
        }));
    };

    function handleRemoveEmailFromList(email: string) {
        setObjectInviteList(objectInviteList.filter(emailItem => emailItem.email !== email));
    }

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(inviteLink)
    }

    return (
        <Card sx={{ marginTop: 1, minWidth: 275, }}>
            <CardContent>
                <Grid container spacing={1} sx={{
                    display: 'block',
                    minHeight: '100px',
                    minWidth: '100%'
                }}>
                    <Grid item >
                        <Typography variant="h6" component="span">Invite members</Typography>
                        <Typography variant="body2" component="p" >Send the invite link for a member to join to your team.</Typography>
                    </Grid>
                    <Grid item sx={{
                        display: 'block',
                    }}>
                        <Button variant="outlined" size="medium" startIcon={<ContentCopyIcon />} sx={{
                            textTransform: 'none',
                            width: smDown ? '100%' : '50%',
                            paddingLeft: 6,
                            overflow: 'overlay',
                            marginBottom: '10px',
                            marginTop: '10px'
                        }} onClick={copyRoomCodeToClipboard}>
                            {inviteLink}
                        </Button>
                    </Grid>
                    <Divider>Or</Divider>
                    <Grid item >
                        <Typography variant="body2" component="p">Send the invite by email.</Typography>
                        <Box component="form" noValidate sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            minHeight: '40px',
                            alignItems: 'flex-start',
                            marginTop: 2
                        }}>
                            <Grid md={10} sm={8} xs={12}>
                                <StyledTextField type="email" size="small" id="email" placeholder="Add multiple addresses separated by commas" label="Email address" color="primary" variant="outlined" fullWidth
                                    onChange={event => setEmail(event.target.value)}
                                    error={error}
                                    helperText={error && email && 'Enter a valid email.'}
                                    InputProps={{
                                        endAdornment: icon
                                    }} />
                            </Grid>
                            <Grid md={2} sm={4} xs={12} sx={{
                                paddingTop: smDown ? 2 : 0
                            }}>
                                <Button variant="contained" size="medium" sx={{ backgroundColor: 'primary.light' }} endIcon={<SendIcon />}>Enviar</Button>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <div style={{
                margin: '0px',
                overflow: 'hidden',
                width: 'inherit',
                height: 'inherit',
                maxWidth: 'inherit',
                maxHeight: 'inherit',
            }}>
                <div style={{
                    right: '0px',
                    bottom: '0px'
                }}>
                    <div style={{
                        height: 'auto',
                        overflow: 'hidden',
                        direction: 'inherit',
                        boxSizing: 'border-box',
                        position: 'relative',
                        display: 'block',
                        width: 'auto',
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}>
                        <div style={{
                            padding: 0
                        }}>
                            <Table aria-label="simple table">
                                <TableHead sx={{
                                    backgroundColor: 'rgba(63, 81, 181, 0.08)'
                                }}>
                                    <TableRow>
                                        <TableCell size="medium">Member</TableCell>
                                        <TableCell size="medium" align="center">Role</TableCell>
                                        <TableCell size="small" align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        objectInviteList.map(object => {
                                            return (
                                                <TableRow>
                                                    <TableCell size="medium">{object.email}</TableCell>
                                                    <TableCell size="medium" align="center">
                                                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                            <InputLabel id="demo-simple-select-helper-label">Profile *</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="select"
                                                                value={object.role}
                                                                label="Profile *"
                                                                onChange={(event) => handleChange(object, event)}
                                                                sx={{
                                                                    width: '100%'
                                                                }}
                                                                required
                                                            >
                                                                {
                                                                    profiles.map((profile: any) => {
                                                                        return (
                                                                            <MenuItem value={profile.id}>{profile.name}</MenuItem>
                                                                        )
                                                                    })
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell size="small" align="right">
                                                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveEmailFromList(object.email)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </Card >
    );
}
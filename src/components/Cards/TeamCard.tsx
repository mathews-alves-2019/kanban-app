import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import validator from 'validator';

import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "80%",
}));

type User = {
    id: string;
    name: string;
    avatar: string;
    email: string | null;
    isLoggedByGoogle: boolean;
    position: string
}

type TeamCardProps = {
    user?: User
}

export function TeamCard({ user }: TeamCardProps) {
    const icon = <Button sx={ { display: 'contents' } } onClick={handleAddEmail}><AddCircleIcon /></Button>;
    const [ emailsList, setEmailsList ] = useState<string[]>([]);
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState(false);

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        console.log('useEffect')
        console.log(emailsList)
    }, [emailsList])

    function handleAddEmail() {
        if (validator.isEmail(email)) {
            setEmailsList(oldList => [...oldList, email]);
            setError(false);
            return;
        }
        setError(true);
    }

    function handleRemoveEmailFromList(email: string) {       
        setEmailsList(emailsList.filter( emailItem => emailItem !== email));
    }

    return (
        <Card sx={{ marginTop: 3 }}>
            <CardContent>
                <Grid container spacing={1} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100px',
                    width: '100%'
                }}>
                    <Grid item>
                        <Typography variant="h6" component="span">Invite members</Typography>
                        <Typography variant="body2" component="p">Send the invite link for a member to join to your team.</Typography>
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
                                    onChange={ event => setEmail(event.target.value) }
                                    error={error}
                                    helperText={ error && email && 'Enter a valid email.'}
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
                    <Grid item sx={{ paddingBottom: 0, paddingTop: 0, width: '68%' }}>
                        <List dense={true}>
                            {
                                emailsList.map(email => {
                                    return (<ListItem sx={{
                                        paddingLeft: 1 
                                    }}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveEmailFromList(email)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }>
                                        <ListItemText
                                            primary={email}
                                        />
                                    </ListItem>);
                                })
                            }
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
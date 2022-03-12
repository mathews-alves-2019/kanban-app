import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import { useAuth } from "../hooks/useAuth";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface StyledTabProps {
    label: string;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    height: '0.4375em',
}));

const NoneTransformTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
    }),
);

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, paddingLeft: 0 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function Account() {
    const [value, setValue] = useState(0);
    const { user } = useAuth();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} variant="scrollable">
                    <NoneTransformTab label="General" {...a11yProps(0)} ></NoneTransformTab>
                    <NoneTransformTab label="Team" {...a11yProps(1)} />
                    <NoneTransformTab label="Notifications" {...a11yProps(2)} />
                    <NoneTransformTab label="Security" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <Box >
                <TabPanel value={value} index={0} >
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} lg={3} md={4} sx={{ marginTop: 2, }}>
                                    <Typography variant="h6" component="span">Basic details</Typography>
                                </Grid>
                                <Grid item xs={12} lg={9} md={8} sx={{ paddingLeft: smDown ? 1 : 5, paddingRight: smDown ? 1 : 10, display: 'flex', flexDirection: 'column', height: '220px' }}>
                                        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                            <Avatar alt={ user?.name } src={user?.avatar} sx={{ width: '3em', height: '3em' }}/>
                                            <Typography variant="subtitle1" component="span" sx={{ marginLeft: 2 }}>{ user?.position }</Typography>
                                        </Box>
                                        <Box sx={{ marginTop: 2 }}>
                                            <StyledTextField id="user-name" label="Name" variant="outlined" defaultValue={user?.name} disabled />
                                        </Box>
                                        <Box sx={{ marginTop: 6 }}>
                                            <StyledTextField id="user-email" label="Email" variant="outlined" defaultValue={user?.email} disabled />
                                        </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'right', display: 'flex', paddingLeft: 5, paddingRight: smDown ? 3 : 12, paddingBottom: 2.5}}>
                            <Button variant="contained" size="small" disabled={ user?.isLoggedByGoogle }>Salvar</Button>
                        </CardActions>
                    </Card>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item four
                </TabPanel>
            </Box>
        </Box>
    );
}
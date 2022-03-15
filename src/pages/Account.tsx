import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import { useAuth } from "../hooks/useAuth";
import { BasicDetailsCard } from "../components/Cards/BasicDetailsCard";
import { DeleteAccountCard } from "../components/Cards";
import { TeamCard } from "../components/Cards/TeamCard";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface StyledTabProps {
    label: string;
}

const NoneTransformTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        color: theme.palette.secondary.main,
        '&.Mui-selected': {
            color: theme.palette.secondary.dark,
        }, 
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
                    <BasicDetailsCard />
                    <DeleteAccountCard />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TeamCard />
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
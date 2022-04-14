import { Backdrop, Box, CircularProgress, DialogTitle, Divider, IconButton, styled, Tab, Tabs, MenuItem, useMediaQuery, useTheme, Table, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, Avatar, SelectChangeEvent } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import SquadRegisterModal from "./Modal";
import { useEffect, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import { SquadType } from "../../types/SquadType";
import ProfileService from "../../services/ProfileService";
import SquadService from "../../services/SquadService";
import { FacebookCircularProgress } from "../CircularProgress";

type MembersSquadModalType = {
    isOpen: boolean,
    wrapperRef: React.MutableRefObject<null>,
    handleClose: () => void,
    squad: SquadType | null
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

type SquadMembersType = {
    usersId: string,
    squads: any,
    position: string,
    users: {
        id: string,
        name: string,
        email: string,
        password: string,
        position: string,
        avatarImage: string,
        active: boolean,
        isProvided: boolean,
        providedId: string,
        created_at: Date,
        expires_at: Date | null,
        profile: any,
        notifications: any
    }
}

const positions = [
    "OWNER",
    "MEMBER"
]

export default function MembersSquadModal({ handleClose, isOpen, wrapperRef, squad }: MembersSquadModalType) {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [squadMembers, setSquadMembers] = useState<SquadMembersType[]>([]);

    function handleChangePosition(object: SquadMembersType, event: SelectChangeEvent) {
        setSquadMembers([...squadMembers].map(stateObject => {
            if (stateObject.usersId === object.usersId) {
                return {
                    ...stateObject,
                    role: event.target.value
                }
            } else return stateObject;
        }));
    };

    useEffect(() => {
        setIsLoading(true);
        async function getSquadMembers() {
            if (squad) {
                const squadMembers = await SquadService.getSquadMembers(squad.id).then((response: any) => {
                    return response.data;
                });
                console.log(squadMembers.data)
                setSquadMembers(squadMembers.data);
            }
        }
        getSquadMembers();

        setIsLoading(false);
    }, [isOpen]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
                open={false}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <SquadRegisterModal isOpen={isOpen} wrapperRef={wrapperRef} handleClose={handleClose} height={smDown ? "80vh" : "50vh"} width={smDown ? "90vw" : "50vw"}>
                <DialogTitle>
                    <Box sx={{
                        borderColor: 'divider', position: 'absolute',
                        left: 35,
                        top: 17,
                    }} >
                        <Tabs value={value} onChange={handleChange} variant="scrollable">
                            <NoneTransformTab label="Team" {...a11yProps(0)} ></NoneTransformTab>
                            <NoneTransformTab label="Invite" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 14,
                            top: 16,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider variant="fullWidth" />
                <Box >
                    <TabPanel value={value} index={0} >
                        {
                            isLoading ?
                                <FacebookCircularProgress size={100} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    marginTop: smDown ? '70%' : '15%'
                                }} />
                                :
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
                                            overflowX: 'auto',
                                            overflowY: 'auto'
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
                                                            squadMembers.map(object => {
                                                                return (
                                                                    <TableRow>
                                                                        <TableCell size="medium">
                                                                            <Box sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'flex-start'
                                                                            }}>
                                                                                <Avatar alt={object.users.name} src={object.users.avatarImage} sx={{ width: '1.7em', height: '1.7em', marginRight: '20px' }} />
                                                                                {object.users.name}
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell size="medium" align="center">
                                                                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                                                <InputLabel id="demo-simple-select-helper-label">Profile *</InputLabel>
                                                                                <Select
                                                                                    labelId="demo-simple-select-standard-label"
                                                                                    id="select"
                                                                                    value={object.position}
                                                                                    label="Profile *"
                                                                                    size="small"
                                                                                    onChange={(event) => handleChangePosition(object, event)}
                                                                                    sx={{
                                                                                        width: '100%'
                                                                                    }}
                                                                                    required
                                                                                >
                                                                                    {
                                                                                        positions.map((position: any) => {
                                                                                            return (
                                                                                                <MenuItem value={position}>{position}</MenuItem>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </Select>
                                                                            </FormControl>
                                                                        </TableCell>
                                                                        <TableCell size="medium" align="right" >
                                                                            <Box sx={{
                                                                                display: "flex",
                                                                            }}>
                                                                                <IconButton edge="start" aria-label="delete" >
                                                                                    <DeleteIcon color="error" />
                                                                                </IconButton>
                                                                                <IconButton edge="end" aria-label="save" >
                                                                                    <CheckIcon color="success" />
                                                                                </IconButton>
                                                                            </Box>
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
                        }
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <h1>teste2</h1>
                    </TabPanel>
                </Box>
            </SquadRegisterModal >
        </>
    );
}
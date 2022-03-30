import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import AddIcon from '@mui/icons-material/Add';

import Slider from "react-slick";
import SquadCard from "../components/Cards/SquadCard";

export function Squads() {
    const { user } = useAuth();

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1210,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,

                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <Box sx={{ width: '100%', }}>
            <Grid container xs={12}>
                <Grid item sx={{
                    width: '100%',
                    marginTop: '16px'
                }}>
                    <Grid container sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingRight: '4px',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <Grid item >
                            <Typography
                                noWrap
                                component="h4"
                            >
                                My Squads
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" startIcon={<AddIcon />}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" />
                    <Grid item xs={12} sx={{ marginTop: 2, width: 'calc(100% - 16px)' }}>
                        <Box component="main">
                            <Slider {...settings}>
                                {
                                    user?.userSquads.map((squad: any) => {
                                        return (
                                            <SquadCard name={squad.name} />
                                        )
                                    })
                                }
                            </Slider>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
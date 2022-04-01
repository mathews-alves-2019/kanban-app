import { Backdrop, Box, Button, Card, CircularProgress, Divider, Grid, Paper, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import AddIcon from '@mui/icons-material/Add';

import Slider from "react-slick";
import SquadCard from "../components/Cards/SquadCard";

import Swal from 'sweetalert2';
import { useState } from "react";
import SquadService from "../services/SquadService";

import "../styles/slick.scss";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const PrevArrow = ({ currentSlide, slideCount, ...props }: any) => {
    const { onClick } = props;

    return (
        <div {...props} className="custom-prevArrow" onClick={onClick}>
            <ArrowBackIosNewIcon />
        </div>
    );
};

const NextArrow = ({ currentSlide, slideCount, ...props }: any) => {
    const { onClick } = props;

    return (
        <div {...props} className="custom-nextArrow" onClick={onClick}>
            <ArrowForwardIosIcon />
        </div>
    );
};

export function Squads() {
    const { user, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    var settings = {
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1248,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }
            }
        ]
    };

    async function handleDelete(squadId: string) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                await SquadService.updateActiveStatus(squadId, false).then(async () => {
                    await updateUser();
                    setIsLoading(false);
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                })
            }
        })
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Card sx={{
                width: '100%',
                marginTop: '16px',
                minHeight: '460px'
            }}>
                <Box sx={{ width: '100%', }}>
                    <Grid container xs={12}>
                        <Grid item sx={{
                            width: '100%',
                            marginTop: '16px',
                            textAlign: '-webkit-center'
                        }}>
                            <Grid container sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px',
                            }}>
                                <Grid item sx={{ paddingLeft: '30px' }}>
                                    <Typography
                                        noWrap
                                        component="h4"
                                        color="primary"
                                    >
                                        <strong>My Squads</strong>
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ paddingRight: '30px' }}>
                                    <Button variant="outlined" startIcon={<AddIcon />}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" />
                            <Grid item xs={12} sx={{ marginTop: 2, width: '100%' }}>
                                <Box component="main">
                                    <Slider {...settings} arrows={true} >
                                        {
                                            user?.userSquads.map((squad: any) => {
                                                return (
                                                    <SquadCard name={squad.name} handleDelete={handleDelete} squadId={squad.id} />
                                                )
                                            })
                                        }
                                    </Slider>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    );
}
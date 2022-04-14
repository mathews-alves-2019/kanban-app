import { Backdrop, Box, Button, Card, CircularProgress, DialogTitle, Divider, FormControlLabel, FormGroup, Grid, Paper, styled, Switch, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import AddIcon from "@mui/icons-material/Add";

import Slider from "react-slick";
import SquadCard from "../components/Cards/SquadCard";

import Swal from "sweetalert2";
import { useRef, useState } from "react";
import SquadService from "../services/SquadService";

import "../styles/slick.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RegisterModal from "../components/Modal/RegisterModal";
import { SquadType, SquadTypeForSubmit } from "../types/SquadType";
import { SquadModelType } from "../types/SquadModelType";
import MembersSquadModal from "../components/Modal/MembersSquadModal";

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

const defaultValues = {
    id: "",
    name: "",
    urlImage: "",
    isPrivate: false,
};

export function Squads() {
    const { user, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [formValues, setFormValues] = useState<SquadModelType>(defaultValues);
    const [squad, setSquad] = useState<SquadType | null>(null);
    const wrapperRef = useRef(null);

    const [isRequesting, setIsRequesting] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        setIsMembersModalOpen(false);
    }

    const settings = {
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

    function openModalForUpdate(squad: SquadType) {
        setFormValues({
            id: squad.id,
            name: squad.name,
            urlImage: squad.urlImage,
            isPrivate: squad.isPrivate,
        });
        setIsUpdate(true);
        setIsOpen(true);
    }

    function openModalForAdd() {
        setFormValues(defaultValues);
        setIsUpdate(false);
        setIsOpen(true);
    }

    async function handleDelete(squadId: string) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                await SquadService.updateActiveStatus(squadId, false).then(async () => {
                    await updateUser();
                    setIsLoading(false);
                    Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                    );
                })
            }
        })
    }

    async function handleUpdate(squad: SquadType) {
        setIsRequesting(true);
        await SquadService.update(squad, squad.id).then(async () => {
            await updateUser();
            Swal.fire(
                "Updated!",
                "Your squad has been updated.",
                "success"
            );
            setIsOpen(false);
            setIsRequesting(false);
            setIsUpdate(false);
        });
        setFormValues(defaultValues);
    }

    async function handleSubmit(formValues: any) {
        setIsRequesting(true);
        const squad: SquadTypeForSubmit = {
            name: formValues.name,
            active: true,
            urlImage: formValues.urlImage,
            isPrivate: formValues.isPrivate
        }
        await SquadService.create(squad).then(async (squadCreated) => {
            if (squadCreated!.data.data.id)
                await SquadService.addMemberOnSquad({
                    usersId: user!.id,
                    squadsId: squadCreated!.data.data.id,
                    active: true,
                    position: "OWNER",
                    canCreateBoard: true,
                    canCreateCard: true,
                    canEditBoard: true,
                    canEditSquad: true,
                    canDeleteBoard: true,
                    canDeleteCard: true,
                    canEditCard: true
                }).then(async () => {
                    setIsOpen(false);
                    setIsRequesting(false);
                    await updateUser();
                    Swal.fire(
                        "Created!",
                        "Your squad has been created.",
                        "success"
                    );
                }).catch((error) => {
                    console.error(error);
                    setIsRequesting(false);
                });
        }).catch((error) => {
            console.error(error);
            setIsRequesting(false);
        });

        setFormValues(defaultValues);
    }

    function handleOpenMembersModal(squad: SquadType) {
        setSquad(squad);
        setIsMembersModalOpen(true);
    }

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Card sx={{
                width: "100%",
                marginTop: "16px",
                minHeight: "460px"
            }}>
                <Box sx={{ width: "100%", }}>
                    <Grid container xs={12}>
                        <Grid item sx={{
                            width: "100%",
                            marginTop: "16px",
                            textAlign: "-webkit-center"
                        }}>
                            <Grid container sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}>
                                <Grid item sx={{ paddingLeft: "30px" }}>
                                    <Typography
                                        noWrap
                                        component="h4"
                                        color="primary"
                                    >
                                        <strong>My Squads</strong>
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ paddingRight: "30px" }}>
                                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => openModalForAdd()}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" />
                            <Grid item xs={12} sx={{ marginTop: 2, width: "100%" }}>
                                <Box component="main">
                                    <Slider {...settings} arrows={true} >
                                        {
                                            user?.userSquads?.map((squad: any) => {
                                                return (
                                                    <SquadCard handleDelete={handleDelete} squad={squad} openModalForUpdate={openModalForUpdate} handleOpenMembersModal={handleOpenMembersModal}/>
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
            <RegisterModal isOpen={isOpen} isUpdate={isUpdate} wrapperRef={wrapperRef} handleClose={handleClose} handleSubmit={handleSubmit} handleUpdate={handleUpdate} isRequesting={isRequesting} formValues={formValues} setFormValues={setFormValues} />
            <MembersSquadModal squad={squad} isOpen={isMembersModalOpen} wrapperRef={wrapperRef} handleClose={handleClose}/>
        </>
    );
}
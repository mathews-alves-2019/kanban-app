import { Backdrop, Box, Button, CircularProgress, DialogTitle, Divider, FormControlLabel, FormGroup, Grid, IconButton, styled, Switch, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

import SquadRegisterModal from "./Modal";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { storage } from "../../services/firebase";

type SquadRegisterModalType = {
    isOpen: boolean,
    wrapperRef: React.MutableRefObject<null>,
    handleClose: () => void,
    handleSubmit: (object: any) => void,
    isRequesting: boolean
}

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    height: "0.4375em",
}));

const Input = styled("input")({
    display: "none",
});

const defaultValues = {
    name: "",
    urlImage: "",
    isPrivate: false,
};

export default function RegisterModal({ isOpen, wrapperRef, handleClose, handleSubmit, isRequesting }: SquadRegisterModalType) {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const [formValues, setFormValues] = useState(defaultValues);
    const [imageName, setImageName] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    function handleChange(e: any) {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    function handleSwitchChange(e: any) {
        const { checked } = e.target;
        setFormValues({
            ...formValues,
            isPrivate: checked,
        });
    }    

    async function uploadImage(e: any) {
        setImageName(null);
        setIsUploading(true);
        let urlImage;
        const image = e.target.files[0];
        if (image) {
            urlImage = await (await storage.ref(`/images/${image.name}`).put(image)).ref.getDownloadURL();
            setImageName(image.name);
        }

        console.log(urlImage);

        setFormValues({
            ...formValues,
            urlImage: urlImage ? urlImage : "",
        });

        setIsUploading(false);
    }

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isRequesting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <SquadRegisterModal isOpen={isOpen} wrapperRef={wrapperRef} handleClose={handleClose} height={smDown ? "80vh" : "50vh"} width={smDown ? "90vw" : "50vw"}>
                <DialogTitle>
                    <Typography
                        sx={{
                            position: 'absolute',
                            left: 35,
                            top: 20,
                        }}
                        noWrap
                        variant="h6" component="strong"
                        color="primary"
                    >
                        Squad
                    </Typography>
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
                <FormGroup>
                    <Grid container xs={12} sx={{
                        marginTop: 4,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%"
                    }}>
                        <Grid item sx={{ width: smDown ? "100%" : "80%", display: "flex", justifyContent: "center", minHeight: "60px" }}>
                            <StyledTextField id="squad-name" label="Name" color="primary" variant="outlined" name="name" type="text" value={formValues.name} onChange={handleChange} />
                        </Grid>
                        <Grid item sx={{ minWidth: "100%", display: "block", justifyContent: "center", minHeight: "60px", }}>

                            <label htmlFor="contained-button-file" style={{ width: "100%" }}>
                                <Input accept="image/*" id="contained-button-file" type="file" name="image" onChange={uploadImage} />
                                <Grid item sx={{
                                    marginTop: 2, width: '100%', display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <Box sx={{
                                        paddingTop: smDown ? 2 : 0,
                                        alignItems: "center",
                                        display: "flex",
                                        flexFlow: "wrap",
                                        justifyContent: "center",
                                        outline: "none",
                                        width: isUploading ? "50%" : "80%",
                                        border: "1px dashed #e6e7f1;",
                                        borderRadius: "8px",
                                        backgroundColor: "#f8f9ff",
                                        transition: "all .4s ease-in-out",
                                        color: "#616eb3",
                                        "&:hover": {
                                            backgroundColor: "#ecedf6",
                                            cursor: "pointer",
                                            borderColor: "#5383ff",
                                            color: "#404f9e"
                                        },
                                    }}>
                                        <Box>
                                            <UploadFileIcon fontSize="large" />
                                        </Box>
                                        <Box sx={{ padding: 2 }}>
                                            {
                                                isUploading ?
                                                    <CircularProgress />
                                                    :
                                                    (imageName ?
                                                        <>
                                                            <Typography
                                                                noWrap
                                                                variant="h6" component="div"
                                                            >
                                                                <strong>Selected image</strong>
                                                            </Typography>
                                                            <Box>
                                                                <Typography
                                                                    noWrap component="p"
                                                                >
                                                                    {imageName}
                                                                </Typography>
                                                            </Box>
                                                        </>
                                                        :
                                                        <>
                                                            <Typography
                                                                noWrap
                                                                variant="h6" component="div"
                                                            >
                                                                <strong>Select image</strong> <small>(not required)</small>
                                                            </Typography>
                                                            <Box>
                                                                <Typography
                                                                    noWrap component="p"
                                                                >
                                                                    Select a background image for squad
                                                                </Typography>
                                                            </Box>
                                                        </>)

                                            }
                                        </Box>
                                    </Box>

                                </Grid>
                            </label>
                        </Grid>
                        <FormControlLabel control={<Switch checked={formValues.isPrivate}
                            onChange={(event) => handleSwitchChange(event)} />} label="Private" sx={{ marginTop: "10px" }} />
                        <Button variant="contained" sx={{ marginTop: "10px", width: smDown ? "100%" : "80%", textTransform: "none" }} onClick={() => handleSubmit(formValues)}>
                            Save
                        </Button>
                    </Grid>
                </FormGroup >
            </SquadRegisterModal >
        </>
    )
}
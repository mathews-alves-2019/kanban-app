import { Avatar, Box, Button, Checkbox, Divider, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { SignSignUpFormHeader } from '../SignSignUpFormHeader';

type LoginFormType = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    handleChangeForm: () => void,
}

export function PasswordRecover({ handleSubmit, handleChangeForm }: LoginFormType) {
    return (
        <>
            <Typography component="h1" variant="h3" color="primary.dark">
                Forgot your password? 
            </Typography>
            <Typography variant="body2" gutterBottom color="secondary.light">
                Please enter the email address associated with your account and We will email you a link to reset your password.
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    color='primary'
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Reset Password
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    onClick={ handleChangeForm }
                    sx={{ mt: 2, mb: 2 }}
                >
                    Back
                </Button>
            </Box>
        </>
    );
}
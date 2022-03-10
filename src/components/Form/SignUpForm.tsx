import { SignSignUpFormHeader } from "../SignSignUpFormHeader";
import { Avatar, Box, Button, Checkbox, Divider, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';

type LoginFormType = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    handleChangeForm: () => void,
}

export function SignUpForm({ handleChangeForm, handleSubmit }: LoginFormType) {
    return (
        <>
            <SignSignUpFormHeader labelText="Sign Up" />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            color='primary'
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="Firs Name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            color='primary'
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            color='primary'
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            color='primary'
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="confirmPassword"
                            id="confirmPassword"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            color='primary'
                            control={<Checkbox color='primary'
                                value="remember" />}
                            label="Remember me"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="#" onClick={handleChangeForm} variant="body2">
                            {"Already have an account? Login"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
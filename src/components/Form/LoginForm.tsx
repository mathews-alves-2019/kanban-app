import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, Link, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { SignSignUpFormHeader } from '../SignSignUpFormHeader';

type LoginFormType = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    handleChangeForm: () => void,
    handlePasswordRecover: () => void,
    handleLogin: () => void,
}

export function LoginForm({ handleSubmit, handleChangeForm, handlePasswordRecover, handleLogin }: LoginFormType) {
    return (
        <>
            <SignSignUpFormHeader labelText="Sign in" />
            <Box component="form" noValidate onSubmit={ handleSubmit } sx={{ mt: 1 }}>
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
                <FormControlLabel
                    color='primary'
                    control={<Checkbox color='primary'
                        value="remember" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Divider>Or</Divider>
                <Button variant="contained" startIcon={<GoogleIcon />}
                    fullWidth
                    onClick={ handleLogin }
                    sx={{ mt: 3, mb: 2, backgroundColor: '#ea4335' }}
                >
                    Login with Google
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2" onClick={ handlePasswordRecover }>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" onClick={ handleChangeForm } variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
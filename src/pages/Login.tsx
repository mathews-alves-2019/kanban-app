import { Box, Container, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useAppThemeContext } from '../contexts/';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/Form/LoginForm';
import { useEffect, useState } from 'react';
import { SignUpForm } from '../components/Form/SignUpForm';
import { PasswordRecover } from '../components/Form/PasswordRecover';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import { FacebookCircularProgress } from '../components/CircularProgress';

/* <Button variant='contained'
color='primary' onClick={toggleTheme}>Toggle Theme</Button> */

export function Login() {
    const { user, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const { toggleTheme } = useAppThemeContext();
    const [isLogin, setIsLogin] = useState(true);
    const [isPassowrdRecover, setIsPassowrdRecover] = useState(false);
    const { loading, hideLoading, showLoading } = useLoading();

    const handleChangeForm = () => {
        setIsPassowrdRecover(false);
        setIsLogin(!isLogin);
    }

    const handlePasswordRecover = () => {
        setIsPassowrdRecover(true);
        setIsLogin(false);
    }

    async function handleLogin() {
        if (!user) {
            await signInWithGoogle();
        }
        showLoading();
        setTimeout(() => {
            navigate('/');
            hideLoading();
        }, 300);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <>
            { loading ? (
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <FacebookCircularProgress size={100}/>
                    </Box>
                </Container>
            )
                : (
                    <Grid container component="main" sx={{ height: '100vh' }}>
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: 'url(https://source.unsplash.com/random)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: isLogin || isPassowrdRecover ? 8 : 2,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    paddingTop: '50px',
                                }}
                            >
                                {isLogin ? <LoginForm handleLogin={handleLogin} handleSubmit={handleSubmit} handleChangeForm={handleChangeForm} handlePasswordRecover={handlePasswordRecover} />
                                    : isPassowrdRecover ? <PasswordRecover handleSubmit={handleSubmit} handleChangeForm={handleChangeForm} />
                                        : <SignUpForm handleSubmit={handleSubmit} handleChangeForm={handleChangeForm} />}
                            </Box>
                        </Grid>
                    </Grid>
                )}
        </>
    );
}
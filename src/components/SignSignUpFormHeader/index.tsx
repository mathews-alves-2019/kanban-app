import { Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type SignSignUpFormHeaderType = {
    labelText: string
}

export function SignSignUpFormHeader({ labelText }: SignSignUpFormHeaderType) {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                { labelText }
            </Typography>
        </>
    );
}
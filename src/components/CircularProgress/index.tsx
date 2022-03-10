import { Box, CircularProgress, circularProgressClasses, CircularProgressProps } from "@mui/material";

export function FacebookCircularProgress(props: CircularProgressProps) {
    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh'
        }}>
            <CircularProgress
                variant="determinate"
                color="primary"
                size={props.size}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                color="secondary"
                sx={{
                    animationDuration: '550ms',
                    position: 'absolute',
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    }
                }}
                size={props.size}
                thickness={4}
                {...props}
            />
        </Box>
    );
}
import { Box, CircularProgress, circularProgressClasses, CircularProgressProps } from "@mui/material";

export function FacebookCircularProgress(props: CircularProgressProps) {
    return (
        <Box sx={props.sx}>
            <CircularProgress
                variant="determinate"
                color="primary"
                size={props.size}
                thickness={4}
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
            />
        </Box>
    );
}
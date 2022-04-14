import { Backdrop, Box, Modal } from "@mui/material";
import React, { ReactNode } from "react";
import { useSpring, animated } from '@react-spring/web';

type ModalType = {
    isOpen: boolean,
    wrapperRef: React.MutableRefObject<null>,
    handleClose: () => void,
    children: ReactNode,
    width: string,
    height: string
}

interface FadeProps {
    children?: React.ReactElement;
    in: boolean;
    onEnter?: () => {};
    onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });
    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

export default function SquadRegisterModal({ isOpen, wrapperRef, handleClose, children, width, height}: ModalType) {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width,
        minHeight: height,
        bgcolor: 'background.paper',
        borderRadius: '9px',
        boxShadow: 24,
        p: 4,
        maxHeight: '90vh',
    };

    return (
        <Modal
            ref={wrapperRef}
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <Box sx={style} >
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
}
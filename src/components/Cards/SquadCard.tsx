import { Card, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, Typography } from "@mui/material";

import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DeleteIcon from '@mui/icons-material/Delete';

type SquadCard = {
    name: string,
    squadId: string,
    handleDelete: (squadId: string) => void,
}

export default function SquadCard({ name, handleDelete, squadId }: SquadCard) {
    return (
        <Grid item sx={{
            marginBottom: '20px',
        }}>
            <Card sx={{ width: 300, height: 300}}>
                <CardMedia sx={{ minWidth: 300, height: 130 }}
                    component="img"
                    image='https://source.unsplash.com/random'
                    alt="squad image"
                />
                <CardContent sx={{
                    textAlign: 'center'
                }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Chip sx={{
                        color: '#009b24',
                        backgroundColor: '#e5f9ed',
                        borderRadius: '10px'
                    }} label="24 active tasks" color="success" />
                </CardContent>
                <CardActions sx={{
                    justifyContent: 'center'
                }}>
                    <IconButton aria-label="Backlog" color="primary" size="medium">
                        <SplitscreenIcon />
                    </IconButton>
                    <IconButton aria-label="Team" color="primary" size="medium">
                        <GroupsIcon />
                    </IconButton>
                    <IconButton aria-label="Reports" color="primary" size="medium">
                        <AssessmentIcon />
                    </IconButton>
                    <IconButton aria-label="Delete" color="error" size="medium" onClick={() => handleDelete(squadId)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Chip} from "@material-ui/core";

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card variant="outlined">
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://www.wallpaperup.com/uploads/wallpapers/2013/07/01/112481/62c30d7e73033ad264c790b63b233bba-700.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Q: how to measure my dick correctly? Depending whether I belong her or not🥺
                    </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions>
                <Chip label="PornHub"  variant="outlined" />
                <Chip label="Asian"  variant="outlined" />
                <Chip label="Massive Cock"  variant="outlined" />
            </CardActions>
        </Card>
    );
}

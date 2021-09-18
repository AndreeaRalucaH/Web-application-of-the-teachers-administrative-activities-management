import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const drawerWidth = 240;

const colorAppBar = '#30475e'
const colorMain = '#ececec'

const styles = theme => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: colorMain,

    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
    },
    fixedHeight: {
        height: 240,
    },
    personIcon: {
        color: colorAppBar,
        fontSize: 25
    },
    rootCard: {
        position: 'relative',
        borderRadius: '1rem',
        minWidth: 320,
        '&:before': {
            transition: '0.2s',
            position: 'absolute',
            width: '100%',
            height: '100%',
            content: '""',
            display: 'block',
            borderRadius: '1rem',
            zIndex: 0,
            bottom: 0,
        },
        '&:hover': {
            '&:before': {
                bottom: -6,
            },
            '& $logo': {
                transform: 'scale(1.1)',
                boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
            },
        },
        backgroundColor: "white"

    },
    mediaCard: {
        height: 200,

    },
    trashIcon: {
        float: 'right',
        color: '#61A0AF',
        fontSize: 20,
        height: 50
    },
    toolbarSecond: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(8),
        // paddingTop: 120,
        // paddingBottom: 80,
        padding: theme.spacing(8, 0),
    },
    avatar: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
})

class CardNrTotalActivitati extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography>
                            {this.props.numarTotalActivitatiAnCurent}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }

}


export default withStyles(styles)(CardNrTotalActivitati)
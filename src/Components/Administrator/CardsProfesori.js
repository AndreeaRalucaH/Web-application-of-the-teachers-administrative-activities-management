import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Trash } from 'react-bootstrap-icons/build/index.js';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import { Box } from '@material-ui/core';
import PopUpAfiseazaDetaliiProfesori from './PopUpAfiseazaDetaliiProfesori'

const drawerWidth = 240;

const colorAppBar = '#30475e'
const colorMain = '#ececec'

// const theme = createMuiTheme({
//     typography: {
//         fontFamily: [
//             'Chilanka',
//             'cursive',
//         ].join(','),
//     },
// });


const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 25, // keep right padding when drawer closed 
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: colorAppBar,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
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
        fontSize: 20
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
        marginBottom: theme.spacing(2),
        width: theme.spacing(8),
        height: theme.spacing(8),
        fontSize: 43,
        backgroundColor: "#61A0AF",
    },
    box: {
        // margin: theme.spacing(1),
        marginBottom: theme.spacing(-1),
    }

})


class CardsProfesori extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,

            numeProf: "",
            prenumeProf: "",
            emailProf: "",
            gradProf: "",
            vechimeProf: 0,
            telefonProf: "",
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
    }

    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Box display="flex" justifyContent="center" alignItems="center" className={classes.box}>
                    <Typography gutterBottom display="inline" variant="h6" component="h3">Numar cadre didactice</Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    <Avatar className={classes.avatar} >{this.props.nrProfesori}</Avatar>
                </Box>
                <Grid container spacing={4}>
                    {this.props.profesori.map((profesori, index) => (
                        <Grid item xs={12} md={4} key={profesori.ProfesorID}>
                            <Card className={classes.rootCard}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        className={classes.mediaCard}
                                        image="https://icon-library.com/images/small-person-icon/small-person-icon-24.jpg"
                                        title={profesori.NumeProfesor}

                                    />
                                    <CardContent>
                                        <div onClick={() => {
                                            this.handleClickOpen();
                                            this.setState({ numeProf: profesori.NumeProfesor });
                                            this.setState({ prenumeProf: profesori.PrenumeProfesor });
                                            this.setState({ emailProf: profesori.EmailProfesor });
                                            this.setState({ gradProf: profesori.GradProfesor });
                                            this.setState({ vechimeProf: profesori.VechimeProfesor });
                                            this.setState({ telefonProf: profesori.TelefonProfesor });
                                        }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {profesori.NumeProfesor}
                                                {" "}
                                                {profesori.PrenumeProfesor}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {profesori.GradProfesor}
                                            </Typography>
                                        </div>

                                        <Divider />
                                        <Trash className={classes.trashIcon} onClick={() => { this.props.onDeleteProfesor(profesori.ProfesorID, index) }} />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <PopUpAfiseazaDetaliiProfesori
                    open={this.state.open}
                    onClose={this.handleClose}
                    numeProf={this.state.numeProf}
                    prenumeProf={this.state.prenumeProf}
                    emailProf={this.state.emailProf}
                    vechimeProf={this.state.vechimeProf}
                    gradProf={this.state.gradProf}
                    telefonProf={this.state.telefonProf}
                />

            </Container>
        )

    }
}

export default withStyles(styles)(CardsProfesori);
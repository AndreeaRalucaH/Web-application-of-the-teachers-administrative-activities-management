import React, { Component } from 'react'
import MenuItem from "@material-ui/core/MenuItem"
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Journal, Journals, StickiesFill,PersonCircle, DoorClosedFill } from 'react-bootstrap-icons/build/index.js';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import { ListSubheader } from '@material-ui/core';

import { profesoriRoute } from '../../Routes/ApiRouter'
import { get } from '../../Calls/Calls';
import eventBus from '../EventBus/EventBus';
import State from '../State/State';


const drawerWidth = 250;
const colorAppBar = '#30475e'
const backgroundAppMenu = "#FBFBFF"
const colorMain = '#ececec'

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Chilanka',
            'cursive',
        ].join(','),
    },
});



const styles = theme => ({
    root: {
        display: 'flex',

    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed

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
        color: "white"
    },
    menuButtonHidden: {
        display: 'none',

    },
    title: {
        flexGrow: 1,
        color: "white"
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: backgroundAppMenu

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
        // backgroundColor: backgroundAppMenu
    },
    personIcon: {
        color: colorAppBar,
        fontSize: 25
    },
    leftArrow: {
        color: "#2b2c34"
    },
    textColor: {
        color: "#2b2c34"
    }
})

class MenuProfesori extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            initiale: "",
            titlu: "",
            mesaj: ""
        }

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.afiseazaMesaj = this.afiseazaMesaj.bind(this);
    }

    handleDrawerOpen() {
        this.setState({ open: true })
    }

    handleDrawerClose() {
        this.setState({ open: false })
    }

    handleClickMenu(event) {
        this.setState({ menu: event.currentTarget })
    }

    handleCloseMenu() {
        this.setState({ menu: null })
    }


    async componentDidMount() {
        let data = await get(profesoriRoute, this.props.idProf);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }

        this.setState({ initiale: data.NumeProfesor.charAt(0) + data.PrenumeProfesor.charAt(0) })
    }

    afiseazaMesaj() {
        eventBus.on("verificat", (data) =>
            this.setState({ mesaj: data.message })
        )
        console.log(this.state.mesaj)
    }

    logOutProf() {
        State.setLogoutProf();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="#5B8E7D" noWrap className={classes.title}>
                            {this.props.titlu}
                        </Typography>
                        <IconButton>
                            <Avatar className={classes.avatar} onClick={this.handleClickMenu} >{this.state.initiale}</Avatar>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.menu}
                                keepMounted
                                open={Boolean(this.state.menu)}
                                onClose={this.handleCloseMenu}
                                className={classes.menu}
                            >
                                <MenuItem onClick={() => {
                                    this.handleCloseMenu()
                                    this.props.onPushProfil()
                                }}>Profil</MenuItem>
                                <MenuItem onClick={() => {
                                    this.handleCloseMenu()
                                    this.logOutProf();
                                    this.props.onPushLogin()
                                }}>Deconectare</MenuItem>
                            </Menu>
                        </IconButton>
                        {/* <IconButton color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <NotificationsIcon onClick={this.state.afiseazaMesaj}/>
                            </Badge>
                        </IconButton> */}
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon className={classes.leftArrow} />
                        </IconButton>
                    </div>
                    <Divider />
                    <ListItem button onClick={this.props.onPushDashboard} >
                        <ListItemIcon>
                            <DashboardRoundedIcon className={classes.personIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" className={classes.textColor} />
                    </ListItem>
                    <ListItem button onClick={this.props.onPushAfisare} >
                        <ListItemIcon>
                            <Journal className={classes.personIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Activitati" className={classes.textColor} />
                    </ListItem>
                    <ListItem button onClick={this.props.onPushAfiseazaNotite}>
                        <ListItemIcon>
                            <StickiesFill className={classes.personIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Notite" className={classes.textColor} />
                    </ListItem>
                    <ListItem button onClick={this.props.onPushActivitatiCadreDidactice} >
                        <ListItemIcon>
                            <Journals className={classes.personIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Activitati cadre didactice" className={classes.textColor} />
                    </ListItem>
                    <Divider />
                    <ListSubheader inset>Setari cont</ListSubheader>
                    <ListItem button onClick={this.props.onPushProfil} >
                        <ListItemIcon>
                            <PersonCircle className={classes.personIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Profil" className={classes.textColor} />
                    </ListItem>
                    <ListItem button onClick={() => {this.logOutProf(); this.props.onPushLogin()}} >
                        <ListItemIcon>
                            <DoorClosedFill className={classes.personIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Deconectare" className={classes.textColor} />
                    </ListItem>

                </Drawer>

            </div>
        )
    }
}
export default withStyles(styles)(MenuProfesori);
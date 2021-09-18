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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { PersonFill, Journals, PersonCircle, DoorClosedFill } from 'react-bootstrap-icons/build/index.js';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import { ListSubheader } from '@material-ui/core';
import State from '../State/State';

import { adminiRoute, adminLoginUpdate } from '../../Routes/ApiRouter'
import { get, updateLoginAdmin } from '../../Calls/Calls';

const drawerWidth = 240;

const colorAppBar = '#30475e'
const colorMain = '#ececec'



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
        backgroundColor: colorMain
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    personIcon: {
        color: colorAppBar,
        fontSize: 25
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(8),
        padding: theme.spacing(8, 0),
    },
    avatar: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },

})


class MenuAdministrator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            initiale: "",
            title: "",

        }

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
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
        let admin = await get(adminiRoute, this.props.idAdmin) //transfer id-ul din componenta parinte
        if (admin.hasErrors) {
            alert(admin.message);
            return;
        }


        this.setState({ initiale: admin.AdminNume.charAt(0) + admin.AdminPrenume.charAt(0) })
        this.setState({ title: this.props.title })
    }

    logOutAdmin() {
        State.setLogoutAdmin();
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
                        <Typography component="h1" variant="h6" noWrap className={classes.title}>

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
                                <MenuItem onClick={this.handleCloseMenu}>Profil</MenuItem>
                                <MenuItem onClick={() => {
                                    this.handleCloseMenu();
                                    this.logOutAdmin()
                                    this.props.onPushLogin()

                                }}>Deconectare</MenuItem>
                            </Menu>
                        </IconButton>
                        {/* <IconButton color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <NotificationsIcon />
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
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <ListItem button onClick={this.props.onPushDashb}>
                        <ListItemIcon>
                            <DashboardRoundedIcon className={classes.personIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={this.props.onPushAfisare}>
                        <ListItemIcon>
                            <PersonFill className={classes.personIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Afisare profesori" />
                    </ListItem>
                    <ListItem button onClick={this.props.onPushActivitati}>
                        <ListItemIcon>
                            <Journals className={classes.personIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Activitati profesori" />
                    </ListItem>
                    <Divider />
                    <ListSubheader inset>Setari cont</ListSubheader>
                    <ListItem button onClick={this.props.onPushProfil} >
                        <ListItemIcon>
                            <PersonCircle className={classes.personIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Profil" className={classes.textColor} />
                    </ListItem>
                    <ListItem button onClick={() => {this.logOutAdmin(); this.props.onPushLogin() }} >
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

export default withStyles(styles)(MenuAdministrator);
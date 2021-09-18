import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { activitatiRoute, profesoriRoute, adminiRoute } from '../../Routes/ApiRouter'
import { get, remove } from '../../Calls/Calls';


import MenuAdministrator from "./MenuAdministrator"
import FiltreazaActivitati from './FiltreazaActivitati';



const drawerWidth = 240;
const colorAppBar = '#30475e'
const colorMain = '#ececec'

const theme = createMuiTheme({
  typography: {
      fontFamily: [
          'Chilanka',
          'cursive',
          // "Comic Neue", 'cursive',
      ].join(','),
      fontSize: 15
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
  addIcon: {
    position: "absolute",
    right: '50px',
    bottom: '35px',
    height: "55",
    textAlign: "right",
    backgroundColor: colorAppBar,
    color: colorMain

  },
  rootCard: {
    borderRadius: '1rem',
    boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
  },
  trashIcon: {
    float: 'right',
    color: colorAppBar,
    fontSize: 20,
    height: 50
  },
  chip: {
    float: 'left',
    backgroundColor: colorAppBar,
    marginTop: theme.spacing(1),
    color: "white"
  }

})

class AfisareActivitatiProfesori extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profesori: [],
      activitati: [],
      profID: 0,
      title: "Activitati cadre didactice",

    }
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    let data = await get(adminiRoute, id);
    if (data.hasErrors) {
      alert(data.message);
      return;
    }

    this.setState({ profesori: data.Profesori })

  }



  render() {
    const { classes } = this.props;
    let id = this.props.match.params.id;

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <MenuAdministrator
            titlu={this.state.title}
            idAdmin={id}
            title={this.state.title}
            onPushDashb={() => { this.props.history.push(`/Home/Administrator/${id}`) }}
            onPushAfisare={() => { this.props.history.push(`/Home/Administrator/${id}/AfisareProfesori`) }}
            onPushLogin={() => { this.props.history.push(`/Login`) }}
            onPushActivitati={() => { this.props.history.push(`/Home/Administrator/${id}/AfisareActivitati`) }}
            onPushProfil={() => { this.props.history.push(`/Home/Administrator/${id}/Profil`) }}
          />

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <FiltreazaActivitati profesori={this.state.profesori}  >
            </FiltreazaActivitati>
          </main>
        </div>
      </ThemeProvider>

    )


  }
}

export default withStyles(styles)(AfisareActivitatiProfesori);
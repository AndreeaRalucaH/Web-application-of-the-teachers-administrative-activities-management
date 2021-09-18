import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Trash } from 'react-bootstrap-icons/build/index.js';
import Container from '@material-ui/core/Container';
import Tooltip from '@material-ui/core/Tooltip';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import PopUpAfiseazaDetaliiActivitati from './PopUpAfiseazaDetaliiActivitati';

const drawerWidth = 240;
const colorAppBar = '#30475e'
const colorIcons = "#61A0AF"
const colorMain = '#ececec'

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: [
//       // 'Chilanka',
//       // 'cursive',
//       "Itim", 'cursive'
//     ].join(','),
//   },
// });



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
    color: colorIcons,
    fontSize: 20,
    height: 50
  },
  chipGreen: {
    float: 'left',
    backgroundColor: "#386641",
    marginTop: theme.spacing(1),
    color: "white"
  },
  chipRed: {
    float: 'left',
    backgroundColor: "#bc4749",
    marginTop: theme.spacing(1),
    color: "white"
  },


})

class CardsActivitati extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      idActivitate: 0,
      dataInceput: null,
      dataFinal: null,
      denumireActivitate: '',
      statusActivitate: '',
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
        <Grid container spacing={4}>
          {this.props.activitati.map((activ, index) => (
            <Grid item xs={12} md={6} key={activ.ActivitateID}>
              <Card className={classes.rootCard} >
                <CardActionArea>
                  <CardContent >
                    <div onClick={() => {
                      this.handleClickOpen()
                      this.setState({ idActivitate: activ.ActivitateID })
                      this.setState({ denumireActivitate: activ.DenumireActivitate })
                      this.setState({ dataInceput: activ.DataInceput })
                      this.setState({ dataFinal: activ.DataFinal })
                      this.setState({ statusActivitate: activ.Profesori[0].GestiuneActivitati.VerificareActivitate })
                      if (activ.Atasamente[0] === undefined) {
                        this.setState({ referintaAtasament: '' })
                      } else {
                        this.setState({ referintaAtasament: activ.Atasamente[0].ReferintaAtasament })
                      }
                    }}>
                      <Typography noWrap paragraph gutterBottom variant="h6" component="h2">
                        {activ.DenumireActivitate}
                      </Typography>
                      <Typography gutterBottom display="inline" variant="subtitle1" component="h2">
                        {"Data inceperii: "} { } {activ.DataInceput}
                      </Typography>
                    </div>

                    <Divider />
                    <div>
                      <Tooltip title="Sterge">
                        <Trash className={classes.trashIcon} onClick={() => {
                          this.handleClose()
                          this.props.onDelete(activ.ActivitateID, index)

                        }} />
                      </Tooltip>
                    </div>
                    <Chip label={activ.Profesori[0].GestiuneActivitati.VerificareActivitate} className={activ.Profesori[0].GestiuneActivitati.VerificareActivitate === "Verificat" ? classes.chipGreen : classes.chipRed} />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <PopUpAfiseazaDetaliiActivitati
          open={this.state.open}
          onClose={this.handleClose}
          idActivitate={this.state.idActivitate}
          denumireActivitate={this.state.denumireActivitate}
          dataInceput={this.state.dataInceput}
          dataFinal={this.state.dataFinal}
          statusActivitate={this.state.statusActivitate}
          afiseazaActivitati={this.props.afiseazaActivitate}
          referintaAtasament={this.state.referintaAtasament}
        />
      </Container>
    )
  }
}

export default withStyles(styles)(CardsActivitati);
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { LockFill } from 'react-bootstrap-icons/build/index.js';
import { withStyles } from '@material-ui/core/styles';
import { getAdminNume, get, post } from '../../Calls/Calls';
import { adminiRoute, profesoriRoute } from '../../Routes/ApiRouter';
import Alerts from '../../Alerts/Alerts';


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Chilanka',
      'cursive',
    ].join(','),
  },
});

const colorIcons = '#30475e'
const colorBackground = '#ececec'
const colorTextFiled = '#222831'

const styles = theme => ({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colorTextFiled
    },

  },
  link: {
    color: "black",
    "&:hover": {
      color: "blue",
    },
    // "&:visited":{ //daca link-ul este apasat isi schimba culoarea
    //   color: "blue",
    // }
  },
  lock: {
    color: colorIcons,
    fontSize: 30
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: "black",
    fontSize: 35,

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colorIcons,
    color: "white",
    fontSize: 15,
  },
});

class SignUpProf extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Profesori: {
        NumeProfesor: "",
        PrenumeProfesor: "",
        EmailProfesor: "",
        ParolaProfesor: "",
        GradProfesor: "",
        VechimeProfesor: 0,
        TelefonProfesor: "",
        AdministratorID: 0
      },

      // helperTextNume: "",
      // helperTextPrenume: "",
      // helperTextEmail: "",
      // helperTextParola: "",
      // helperTextTelefon: "",
      // helperTextGradProfesor: "",
      // helperTextVechimeProfesor: "",
      // helperTextAdministratorNume: "",
      // ProfNumeError: false,
      // ProfPrenumeError: false,
      // ProfEmailError: false,
      // ProfParolaError: false,
      // ProfTelefonError: false,
      // GradProfesorError: false,
      // VechimeProfesorError: false,
      // AdministratorNumeError: false,

      tipAlerta: "",
      titluAlerta: "",
      textAlerta: "",
      openAlert: false,
    }

    this.onChangeProf = this.onChangeProf.bind(this);
    this.onHandleClickOpenAlert = this.onHandleClickOpenAlert.bind(this);
    this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);
  }

  onChangeProf(event) {
    let newProf = this.state.Profesori;
    newProf[event.target.name] = event.target.value;
    this.setState({ Profesori: newProf })

    // if (this.state.Profesori.NumeProfesor !== "") {
    //   this.setState({ ProfNumeError: false })
    //   this.setState({ helperTextNume: "" })
    // }
    // if (this.state.Profesori.PrenumeProfesor !== "") {
    //   this.setState({ ProfPrenumeError: false })
    //   this.setState({ helperTextPrenume: "" })
    // }
    // if (this.state.Profesori.EmailProfesor !== "") {
    //   this.setState({ ProfEmailError: false })
    //   this.setState({ helperTextEmail: "" })
    // }
    // if (this.state.Profesori.ParolaProfesor !== "") {
    //   this.setState({ ProfParolaError: false })
    //   this.setState({ helperTextParola: "" })
    // }
    // if (this.state.Profesori.GradProfesor !== "") {
    //   this.setState({ GradProfesorError: false })
    //   this.setState({ helperTextGradProfesor: "" })
    // }
    // if (this.state.Profesori.VechimeProfesor !== "") {
    //   this.setState({ VechimeProfesorError: false })
    //   this.setState({ helperTextVechimeProfesor: "" })
    // }
  }

  onHandleClickOpenAlert() {
    this.setState({ openAlert: true })
  }

  onHandleCloseAlert(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ openAlert: false })

    if (this.state.tipAlerta === "success") {
      this.props.history.push("/Login");
    }
  }

  async saveProfesor() {
    let id = this.props.match.params.id
    if (!id) {
      let parola = document.getElementById("parola");
      let confParola = document.getElementById("confirmaParola");
      if (this.state.Profesori.NumeProfesor !== "" && this.state.Profesori.PrenumeProfesor !== "" && this.state.Profesori.EmailProfesor !== ""
        && this.state.Profesori.ParolaProfesor !== "" && this.state.Profesori.GradProfesor !== "" && this.state.Profesori.VechimeProfesor !== ""
        && this.state.Profesori.TelefonProfesor !== "") {
        if (parola.value === confParola.value) {
          let numeAdmin = document.getElementById("idAdmin");
          let idAdmin = await get(adminiRoute, numeAdmin.value)
          console.log(idAdmin)
          if (idAdmin.message === "not found" || idAdmin === undefined) {
            this.setState({ tipAlerta: "error" })
            this.setState({ titluAlerta: "Eroare" })
            this.setState({ textAlerta: "Nu exista un administrator cu acest ID" })
            this.onHandleClickOpenAlert();
          } else {
            // this.state.Profesori.AdministratorID = idAdmin[0].AdministratorID
            let element = await post(profesoriRoute, this.state.Profesori)
            if (element.hasErrors) {
              alert(element.message);
              return;
            }
            this.setState({ tipAlerta: "success" })
            this.setState({ titluAlerta: "Succes" })
            this.setState({ textAlerta: "Contul a fost creat cu succes" })
            this.onHandleClickOpenAlert();
          }

        } else {

          this.setState({ tipAlerta: "error" })
          this.setState({ titluAlerta: "Eroare" })
          this.setState({ textAlerta: "Parolele nu corespund" })
          this.onHandleClickOpenAlert();

        }
      } else {
        this.setState({ tipAlerta: "error" })
        this.setState({ titluAlerta: "Eroare" })
        this.setState({ textAlerta: "Trebuie completate toate campurile" })
        this.onHandleClickOpenAlert();
      }

    } else {
      this.setState({ tipAlerta: "error" })
      this.setState({ titluAlerta: "Eroare" })
      this.setState({ textAlerta: "Exista deja acest ID" })
      this.onHandleClickOpenAlert();
    }
  }

  async getAdminId() {
    let numeAdmin = document.getElementById("numeAdmin");
    let idAdmin = await getAdminNume(numeAdmin.value)
    console.log(idAdmin[0].AdministratorID);
  }

  async componentDidMount() {
    let id = this.props.match.params.id
    if (!id) {
      return;
    }
    let element = await get(profesoriRoute, id);
    if (element.hasErrors) {
      alert(element.message);
      return;
    }
    this.setState({ Profesori: element })
  }



  render() {
    const { classes } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <LockFill className={classes.lock}></LockFill>
            <Typography component="h1" variant="h5">
              Inregistrare
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="NumeProfesor"
                    variant="outlined"
                    required
                    fullWidth
                    id="numeProfesor"
                    label="Nume"
                    autoFocus
                    className={classes.root}
                    value={this.state.Profesori.NumeProfesor}
                    onChange={(e) => this.onChangeProf(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="preunmeProfesor"
                    label="Prenume"
                    name="PrenumeProfesor"
                    autoComplete="lname"
                    className={classes.root}
                    value={this.state.Profesori.PrenumeProfesor}
                    onChange={(e) => this.onChangeProf(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="EmailProfesor"
                    autoComplete="email"
                    className={classes.root}
                    value={this.state.Profesori.EmailProfesor}
                    onChange={(e) => this.onChangeProf(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="ParolaProfesor"
                    label="Parola"
                    type="password"
                    id="parola"
                    autoComplete="current-password"
                    className={classes.root}
                    value={this.state.Profesori.ParolaProfesor}
                    onChange={(e) => this.onChangeProf(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Confirma parola"
                    type="password"
                    id="confirmaParola"
                    autoComplete="current-password"
                    className={classes.root}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="GradProfesor"
                    label="Gradul"
                    id="gradProfesor"
                    className={classes.root}
                    value={this.state.Profesori.GradProfesor}
                    onChange={(e) => this.onChangeProf(e)}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="VechimeProfesor"
                    label="Vechime"
                    id="vechimeProfesor"
                    className={classes.root}
                    value={this.state.Profesori.VechimeProfesor}
                    onChange={(e) => this.onChangeProf(e)}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="TelefonProfesor"
                    label="Telefon"
                    id="telefonProfesor"
                    className={classes.root}
                    value={this.state.Profesori.TelefonProfesor}
                    onChange={(e) => this.onChangeProf(e)}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="AdministratorID"
                    label="ID Administrator"
                    id="idAdmin"
                    className={classes.root}
                    value={this.state.Profesori.AdministratorID}
                    onChange={(e) => this.onChangeProf(e)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => {
                  e.preventDefault();
                  this.saveProfesor();
                }}
              >
                Inregistrare
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" onClick={(e) => {
                    e.preventDefault()
                    this.props.history.push("/Login");
                  }} className={classes.link}>
                    Deja ai cont? Login
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Alerts
              tipAlerta={this.state.tipAlerta}
              textAlerta={this.state.textAlerta}
              titluAlerta={this.state.titluAlerta}
              openAlert={this.state.openAlert}
              onClose={this.onHandleCloseAlert}
            ></Alerts>

          </div>

        </Container>
      </ThemeProvider>
    );
  }

}
export default withStyles(styles)(SignUpProf);
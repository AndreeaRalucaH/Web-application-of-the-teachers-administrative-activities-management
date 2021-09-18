import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { LockFill } from 'react-bootstrap-icons/build/index.js';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { post, get } from '../../Calls/Calls'
import { adminiRoute } from '../../Routes/ApiRouter';
import { withStyles } from '@material-ui/core/styles';
import Alerts from '../../Alerts/Alerts';

const theme = createTheme({
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


class SignUpAdmin extends Component {

  constructor(props) {
    super(props)

    this.state = {
      Administratori: {
        AdminNume: "",
        AdminPrenume: "",
        AdminEmail: "",
        AdminParola: "",
        AdminTelefon: "",
        GradulDidactic: ""
      },
      helperTextNume: "",
      helperTextPrenume: "",
      helperTextEmail: "",
      helperTextParola: "",
      helperTextTelefon: "",
      helperTextGradulDidactic: "",
      AdminNumeError: false,
      AdminPrenumeError: false,
      AdminEmailError: false,
      AdminParolaError: false,
      AdminTelefonError: false,
      GradulDidacticError: false,

      tipAlerta: "",
      titluAlerta: "",
      textAlerta: "",
      openAlert: false,
    }

    this.onChangeAdmin = this.onChangeAdmin.bind(this);
    this.saveAdmin = this.saveAdmin.bind(this);
    this.onHandleClickOpenAlert = this.onHandleClickOpenAlert.bind(this);
    this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);

  }

  onChangeAdmin(event) {
    let newAdmin = this.state.Administratori;
    newAdmin[event.target.name] = event.target.value;
    this.setState({ Administratori: newAdmin });

    // if (this.state.Administratori.AdminNume !== "") {
    //   this.setState({ AdminNumeError: false })
    //   this.setState({ helperTextNume: "" })
    // }

    // if (this.state.Administratori.AdminPrenume !== "") {
    //   this.setState({ AdminPrenumeError: false })
    //   this.setState({ helperTextPrenume: "" })
    // }

    // if (this.state.Administratori.AdminEmail !== "") {
    //   this.setState({ AdminEmailError: false })
    //   this.setState({ helperTextEmail: "" })
    // }

    // if (this.state.Administratori.AdminParola !== "") {
    //   this.setState({ AdminParolaError: false })
    //   this.setState({ helperTextParola: "" })
    // }

    // if (this.state.Administratori.AdminTelefon !== "") {
    //   this.setState({ AdminTelefonError: false })
    //   this.setState({ helperTextTelefon: "" })
    // }

    // if (this.state.Administratori.GradulDidactic !== "") {
    //   this.setState({ GradulDidacticError: false })
    //   this.setState({ helperTextGradulDidactic: "" })
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

  async saveAdmin() {
    let id = this.props.match.params.id;
    if (!id) {
      let parola = document.getElementById("parolaAdmin")
      let confirmaParola = document.getElementById("vefiricaParola")

      if (this.state.Administratori.AdminNume === "") {
        this.setState({ AdminNumeError: true })
        this.setState({ helperTextNume: "Campul trebuie completat" })
      }
      if (this.state.Administratori.AdminPrenume === "") {
        this.setState({ AdminPrenumeError: true })
        this.setState({ helperTextPrenume: "Campul trebuie completat" })
      }
      if (this.state.Administratori.AdminEmail === "") {
        this.setState({ AdminEmailError: true })
        this.setState({ helperTextEmail: "Campul trebuie completat" })
      }
      if (this.state.Administratori.AdminParola === "") {
        this.setState({ AdminParolaError: true })
        this.setState({ helperTextParola: "Campul trebuie completat" })
      }
      if (this.state.Administratori.AdminTelefon === "") {
        this.setState({ AdminTelefonError: true })
        this.setState({ helperTextTelefon: "Campul trebuie completat" })
      }
      if (this.state.Administratori.GradulDidactic === "") {
        this.setState({ GradulDidacticError: true })
        this.setState({ helperTextGradulDidactic: "Campul trebuie completat" })
      }
      if (this.state.Administratori.AdminNume !== "" && this.state.Administratori.AdminPrenume !== "" &&
        this.state.Administratori.AdminEmail !== "" && this.state.Administratori.AdminParola !== "" &&
        this.state.Administratori.AdminTelefon !== "" && this.state.Administratori.GradulDidactic !== "") {
        if (parola.value === confirmaParola.value) {
          let element = await post(adminiRoute, this.state.Administratori)
          if (element.hasErrors) {
            alert(element.message);
            return;
          }
          this.setState({ tipAlerta: "success" })
          this.setState({ titluAlerta: "Succes" })
          this.setState({ textAlerta: "Contul a fost creat cu succes" })
          this.onHandleClickOpenAlert();

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

    }
    else {
      this.setState({ tipAlerta: "error" })
      this.setState({ titluAlerta: "Eroare" })
      this.setState({ textAlerta: "Exista deja acest ID" })
      this.onHandleClickOpenAlert();
    }


  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    if (!id) {
      return;
    }
    let element = await get(adminiRoute, id);
    if (element.hasErrors) {
      alert(element.message);
      return;
    }
    this.setState({ Administratori: element })
  }

  render() {

    const { classes } = this.props;

    return (

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <LockFill className={classes.lock} ></LockFill>
            <Typography component="h1" variant="h5" className={classes.title}>
              Inregistrare
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >

                  <TextField
                    variant="outlined"
                    id="numeAdmin"
                    label="Nume"
                    name="AdminNume"
                    required
                    className={classes.root}
                    value={this.state.Administratori.AdminNume}
                    onChange={(e) => this.onChangeAdmin(e)}
                    // error={this.state.AdminNumeError}
                    // helperText={this.state.helperTextNume}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Prenume"
                    name="AdminPrenume"
                    autoComplete="lname"
                    value={this.state.Administratori.AdminPrenume}
                    onChange={e => this.onChangeAdmin(e)}
                    className={classes.root}
                    // error={this.state.AdminPrenumeError}
                    // helperText={this.state.helperTextPrenume}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="AdminEmail"
                    autoComplete="email"
                    className={classes.root}
                    value={this.state.Administratori.AdminEmail}
                    onChange={e => this.onChangeAdmin(e)}
                    // error={this.state.AdminEmailError}
                    // helperText={this.state.helperTextEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="AdminParola"
                    label="Parola"
                    type="password"
                    id="parolaAdmin"
                    autoComplete="current-password"
                    className={classes.root}
                    value={this.state.Administratori.AdminParola}
                    onChange={e => this.onChangeAdmin(e)}
                    // error={this.state.AdminParolaError}
                    // helperText={this.state.helperTextParola}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="vefiricaParola"
                    label="Confirma parola"
                    type="password"
                    id="vefiricaParola"
                    autoComplete="current-password"
                    className={classes.root}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="grad"
                    label="Grad Didactic"
                    name="GradulDidactic"
                    autoComplete="grad"
                    className={classes.root}
                    value={this.state.Administratori.GradulDidactic}
                    onChange={e => this.onChangeAdmin(e)}
                    // error={this.state.GradulDidacticError}
                    // helperText={this.state.helperTextGradulDidactic}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="AdminTelefon"
                    label="Telefon"
                    id="telefonAdmin"
                    autoComplete="telefon"
                    className={classes.root}
                    value={this.state.Administratori.AdminTelefon}
                    onChange={e => this.onChangeAdmin(e)}
                    // error={this.state.AdminTelefonError}
                    // helperText={this.state.helperTextTelefon}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => {
                  e.preventDefault();
                  this.saveAdmin();

                }
                }
              >
                Inregistrare
              </Button>
              <Grid container justify="flex-end">
                <Grid item >
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

export default withStyles(styles)(SignUpAdmin);
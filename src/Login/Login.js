import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { getProfEmail, getAdminEmail, updateLoginAdmin } from '../Calls/Calls';
import { adminLoginUpdate } from '../Routes/ApiRouter';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Alerts from '../Alerts/Alerts';

import { LockFill } from 'react-bootstrap-icons/build/index.js';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import State from '../Components/State/State';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Chilanka',
      'cursive',
    ].join(','),
  },
});

const colorIcons = '#30475e'
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
      color: "green",
    },
    "&:visited": { //daca link-ul este apasat isi schimba culoarea
      color: "blue",
    }
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  radioButton: {
    color: colorIcons,
  },
});

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "administrator",
      // Administratori: {
      //   AdminLogin: "false"
      // },
      // // loginProf: "false",

      tipAlerta: "",
      titluAlerta: "",
      textAlerta: "",
      openAlert: false,

    }

    this.onChangeRadioGroup = this.onChangeRadioGroup.bind(this);
    this.onHandleClickOpenAlert = this.onHandleClickOpenAlert.bind(this);
    this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);

  }

  onChangeRadioGroup(e) {
    this.setState({ value: e.target.value });
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
      // this.props.history.push("/Login");
    }
  }

  verificaEmailProfesori(email) {
    var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (re.test(email)) {
      if (email.indexOf("@csie.ase.ro", email.length - "@csie.ase.ro".length) !== -1) {
        return true;
      }
      else {
        return false;
      }

    }
  }

  verificaEmailAdmin(email) {
    var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (re.test(email)) {
      if (email.indexOf("@admincsie.ase.ro", email.length - "@admincsie.ase.ro".length) !== -1) {
        return true;
      }
      else {
        return false;
      }
    }
  }


  async verificaUser(email, parola) {
    if (this.state.value === "profesor") {
      let user = await getProfEmail(email);
      if (user[0]) {
        console.log(user[0]);
        user = user[0];
        if (this.verificaEmailProfesori(email)) {
          if (user.ParolaProfesor === parola) {
            console.log("OK");
            State.setLoggedStateProf()
            // localStorage.setItem('profUtilizator', user[0])

            this.props.history.push(`/Home/Profesor/${user.ProfesorID}`)

          } else {
            this.setState({ tipAlerta: "error" })
            this.setState({ titluAlerta: "Eroare" })
            this.setState({ textAlerta: "Parola incorecta" })
            this.onHandleClickOpenAlert();
          }
        }
        else {
          this.setState({ tipAlerta: "error" })
          this.setState({ titluAlerta: "Eroare" })
          this.setState({ textAlerta: "Emailul trebuie sa fie institutional" })
          this.onHandleClickOpenAlert();
        }

      }
      else {
        this.setState({ tipAlerta: "warning" })
        this.setState({ titluAlerta: "Atentie" })
        this.setState({ textAlerta: "Selectati administrator" })
        this.onHandleClickOpenAlert();
      }
    }
    else {
      if (this.state.value === "administrator") {
        let user = await getAdminEmail(email);
        if (user[0]) {
          console.log(user[0]);
          user = user[0];
          if (this.verificaEmailAdmin(email)) {
            if (user.AdminParola === parola) {
              console.log("OK");
              // this.state.Administratori.AdminLogin = "true"
              // await updateLoginAdmin(adminLoginUpdate, user.AdministratorID, this.state.Administratori)
              console.log(user)
              State.setLoggedStateAdmin();
              this.props.history.push(`/Home/Administrator/${user.AdministratorID}`)

            } else {
              this.setState({ tipAlerta: "error" })
              this.setState({ titluAlerta: "Eroare" })
              this.setState({ textAlerta: "Parola incorecta" })
              this.onHandleClickOpenAlert();
            }
          }
          else {
            this.setState({ tipAlerta: "error" })
            this.setState({ titluAlerta: "Eroare" })
            this.setState({ textAlerta: "Emailul trebuie sa fie institutional" })
            this.onHandleClickOpenAlert();
          }

        }
        else {
          this.setState({ tipAlerta: "error" })
          this.setState({ titluAlerta: "Eroare" })
          this.setState({ textAlerta: "Nu exista acest utilizator" })
          this.onHandleClickOpenAlert();
        }
      }
      else {
        this.setState({ tipAlerta: "warning" })
        this.setState({ titluAlerta: "Atentie" })
        this.setState({ textAlerta: "Selectati profesor" })
        this.onHandleClickOpenAlert();
      }
    }


  }

  logIn(e) {

    console.log("Click", e.target);
    let email = document.getElementById('email').value;
    let pass = document.getElementById('parolaLogin').value;
    if (email !== "" && pass !== "") {
      this.verificaUser(email, pass);
    } else {
      this.setState({ tipAlerta: "error" })
      this.setState({ titluAlerta: "Eroare" })
      this.setState({ textAlerta: "Toate campurile trebuie completate" })
      this.onHandleClickOpenAlert();
    }

    e.preventDefault() // nu se mai reincarca pagina dupa fiecare submit

  }

  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <LockFill className={classes.lock}></LockFill>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                className={classes.root}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Parola"
                type="password"
                id="parolaLogin"
                autoComplete="current-password"
                className={classes.root}

              />
              <FormControl component="fieldset"  >
                {/* <FormLabel component="legend">Gender</FormLabel> */}
                <RadioGroup value={this.state.value} onChange={(e) => this.onChangeRadioGroup(e)} >
                  <FormControlLabel value="administrator" control={<Radio className={classes.radioButton} />} label="Administrator" />
                  <FormControlLabel value="profesor" control={<Radio className={classes.radioButton} />} label="Profesor" />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => {
                  e.preventDefault()
                  this.logIn(e)
                }}
              >
                Login
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Ai uitat parola?
                </Link>
                </Grid> */}
                <Grid item >
                  <Link href="#" variant="body2" onClick={(e) => {
                    e.preventDefault()
                    if (this.state.value === "profesor") {
                      this.props.history.push('/SignUp/Profesor')
                    } else {
                      this.props.history.push('/SignUp/Administrator')
                    }

                  }} >
                    {"Nu ai cont? Inregistreaza-te"}
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

export default withStyles(styles)(Login);
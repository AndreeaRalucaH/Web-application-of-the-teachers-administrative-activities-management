import React, { Component } from 'react'
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, CardHeader, ExpansionPanel, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alerts from '../../Alerts/Alerts.js';
import Avatar from '@material-ui/core/Avatar';
import { Box } from '@material-ui/core';
import PopUpStergereCont from './PopUpStergereCont.js';

import { adminiRoute, profesoriRoute } from '../../Routes/ApiRouter.js';
import { get, put, getAdminNume, remove } from '../../Calls/Calls'

const colorAppBar = '#61A0AF'

const styles = theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    upload: {
        marginTop: theme.spacing(3),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        backgroundColor: colorAppBar,
        color: "white",

    },
    submitAnuleaza: {
        backgroundColor: colorAppBar,
        color: "white",

    },
    cardTitle: {
        '& .MuiCardHeader-title': {
            textAlign: "left"
        },
        backgroundColor: "#61A0AF",
        color: "white"
    },
    rootCard: {
        borderRadius: '0rem',
        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    avatar: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        width: theme.spacing(15),
        height: theme.spacing(15),
        fontSize: 65
    },

})


class FormVizualizeazaProfil extends Component {

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
                AdministratorID: 0,
            },
            Admininstrator: {
                AdminNume: "",
                AdminPrenume: "",
                GradulDidactic: "",
            },
            initiale: "",

            tipAlerta: "",
            titluAlerta: "",
            textAlerta: "",
            openAlert: false,

            open: false,
        }

        this.onChangeProfesori = this.onChangeProfesori.bind(this);
        this.updateProfesor = this.updateProfesor.bind(this);
        this.stergeProfesor = this.stergeProfesor.bind(this);

        this.onHandleClickOpenAlert = this.onHandleClickOpenAlert.bind(this);
        this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
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
            this.props.onPushDashboard();
        }
    }

    onChangeProfesori(event) {
        let newProfesor = this.state.Profesori;
        newProfesor[event.target.name] = event.target.value;
        this.setState({ Profesori: newProfesor });
    }

    async componentDidMount() {
        let profesor = await get(profesoriRoute, this.props.idProfesor);
        this.setState({ Profesori: profesor })
        let admin = await get(adminiRoute, profesor.AdministratorID)
        this.setState({ Admininstrator: admin })
        console.log(this.state.Admininstrator)

        this.setState({ initiale: profesor.NumeProfesor.charAt(0) + profesor.PrenumeProfesor.charAt(0) })
    }

    async updateProfesor() {

        let numeAdmin = document.getElementById("idAdmin");
        console.log(numeAdmin.value)
        let idAdmin = await get(adminiRoute, numeAdmin.value)
        console.log(idAdmin)
        if (idAdmin.message === "not found" || idAdmin === undefined) {
            this.setState({ tipAlerta: "error" })
            this.setState({ titluAlerta: "Eroare" })
            this.setState({ textAlerta: "Nu exista un administrator cu acest ID" })
            this.onHandleClickOpenAlert();
        } else {
            let newProf = await put(profesoriRoute, this.props.idProfesor, this.state.Profesori);
            if (newProf.hasErrors) {
                alert(newProf.message);
                return;
            }
            this.setState({ tipAlerta: "success" })
            this.setState({ titluAlerta: "Succes" })
            this.setState({ textAlerta: "Contul a fost actualizat cu succes" })
            this.onHandleClickOpenAlert();
        }

    }

    //sterge profesor fara index
    async stergeProfesor(){
        let profesorSters = await remove(profesoriRoute, this.props.idProfesor)
        if (profesorSters.hasErrors) {
            alert(profesorSters.message);
            return;
        }
        this.props.onPushLogin();
    }

    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={8}>
                        <form className={classes.form} noValidate>
                            <Card className={classes.rootCard}>
                                <CardHeader title="Profil" className={classes.cardTitle} />
                                <Divider />
                                <CardContent>
                                    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                                        <Avatar className={classes.avatar} >{this.state.initiale}</Avatar>

                                    </Box>
                                    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                                        <Typography gutterBottom display="inline" variant="h6" component="h2">
                                            {"Administrator:"} { }
                                            {this.state.Admininstrator.GradulDidactic} { }
                                            {"Univ."} { } {"Dr."} { }
                                            {this.state.Admininstrator.AdminNume} { }
                                            {this.state.Admininstrator.AdminPrenume}
                                        </Typography>
                                    </Box>

                                    <Grid container spacing={6}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Nume"
                                                name="NumeProfesor"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={this.state.Profesori.NumeProfesor}
                                                onChange={(e) => this.onChangeProfesori(e)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Prenume"
                                                name="PrenumeProfesor"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={this.state.Profesori.PrenumeProfesor}
                                                onChange={(e) => this.onChangeProfesori(e)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Email"
                                                name="EmailProfesor"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={this.state.Profesori.EmailProfesor}
                                                onChange={(e) => this.onChangeProfesori(e)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="ParolaProfesor"
                                                label="Parola"
                                                // type="password"
                                                id="parola"
                                                autoComplete="current-password"
                                                value={this.state.Profesori.ParolaProfesor}
                                                onChange={(e) => this.onChangeProfesori(e)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="GradProfesor"
                                                label="Gradul"
                                                id="gradProfesor"
                                                value={this.state.Profesori.GradProfesor}
                                                onChange={(e) => this.onChangeProfesori(e)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="VechimeProfesor"
                                                label="Vechime"
                                                id="vechimeProfesor"
                                                className={classes.root}
                                                value={this.state.Profesori.VechimeProfesor}
                                                onChange={(e) => this.onChangeProfesori(e)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="TelefonProfesor"
                                                label="Telefon"
                                                id="telefonProfesor"
                                                className={classes.root}
                                                value={this.state.Profesori.TelefonProfesor}
                                                onChange={(e) => this.onChangeProfesori(e)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="AdministratorID"
                                                label="ID Administrator"
                                                id="idAdmin"
                                                value={this.state.Profesori.AdministratorID}
                                                onChange={(e) => this.onChangeProfesori(e)}
                                                className={classes.root}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={6} justify="center">
                                        <Grid item xs={6} md={3}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                className={classes.submit}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    this.updateProfesor()
                                                }}
                                            >
                                                Salveaza
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} md={3}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                className={classes.submit}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    this.handleClickOpen()
                                                }}
                                            >
                                                Sterge contul
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </form>
                        <Alerts
                            tipAlerta={this.state.tipAlerta}
                            textAlerta={this.state.textAlerta}
                            titluAlerta={this.state.titluAlerta}
                            openAlert={this.state.openAlert}
                            onClose={this.onHandleCloseAlert}
                        ></Alerts>

                    </Grid>
                </Grid>
                <PopUpStergereCont
                    open={this.state.open}
                    onClose={this.handleClose} 
                    stergeProfesor={this.stergeProfesor}
                    />

            </Container >
        )
    }
}

export default withStyles(styles)(FormVizualizeazaProfil);
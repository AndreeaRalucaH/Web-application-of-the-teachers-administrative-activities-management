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
import PopUpStergereContAdmin from './PopUpStergereContAdmin.js';

import { adminiRoute } from '../../Routes/ApiRouter.js';
import { get, put, remove } from '../../Calls/Calls'

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
        fontSize: 13

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
        fontSize: 55
    },

})


class FormVizualizeazaProfilAdmin extends Component {

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

            initiale: "",

            tipAlerta: "",
            titluAlerta: "",
            textAlerta: "",
            openAlert: false,

            open: false,
        }


        this.onChangeAdmin = this.onChangeAdmin.bind(this);
        this.updateAdministrator = this.updateAdministrator.bind(this);
        this.stergeAdmin = this.stergeAdmin.bind(this);

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
            this.props.onPushDashb();
        }
    }

    onChangeAdmin(event) {
        let newAdmin = this.state.Administratori;
        newAdmin[event.target.name] = event.target.value;
        this.setState({ Administratori: newAdmin });
    }

    async componentDidMount() {
        let admin = await get(adminiRoute, this.props.idAdmin);
        this.setState({ Administratori: admin })

        this.setState({ initiale: admin.AdminNume.charAt(0) + admin.AdminPrenume.charAt(0) })
    }

    async updateAdministrator() {

        if (this.state.Administratori.AdminTelefon.length !== 10) {
            this.setState({ tipAlerta: "error" })
            this.setState({ titluAlerta: "Eroare" })
            this.setState({ textAlerta: "Numar de telefon incorect" })
            this.onHandleClickOpenAlert();
        } else {
            let newAdmin = await put(adminiRoute, this.props.idAdmin, this.state.Administratori);
            if (newAdmin.hasErrors) {
                alert(newAdmin.message);
                return;
            }
            this.setState({ tipAlerta: "success" })
            this.setState({ titluAlerta: "Succes" })
            this.setState({ textAlerta: "Contul a fost actualizat cu succes" })
            this.onHandleClickOpenAlert();
        }

    }

    //sterge admin fara index
    async stergeAdmin() {
        let adminSters = await remove(adminiRoute, this.props.idAdmin)
        if (adminSters.hasErrors) {
            alert(adminSters.message);
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
                                    <Grid container spacing={6}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Nume"
                                                name="AdminNume"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={this.state.Administratori.AdminNume}
                                                onChange={(e) => this.onChangeAdmin(e)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Prenume"
                                                name="AdminPrenume"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={this.state.Administratori.AdminPrenume}
                                                onChange={(e) => this.onChangeAdmin(e)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Email"
                                                name="AdminEmail"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={this.state.Administratori.AdminEmail}
                                                onChange={(e) => this.onChangeAdmin(e)}
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
                                                name="AdminParola"
                                                label="Parola"
                                                // type="password"
                                                id="parola"
                                                autoComplete="current-password"
                                                value={this.state.Administratori.AdminParola}
                                                onChange={(e) => this.onChangeAdmin(e)}
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
                                                name="GradulDidactic"
                                                label="Gradul"
                                                id="gradProfesor"
                                                value={this.state.Administratori.GradulDidactic}
                                                onChange={(e) => this.onChangeAdmin(e)}
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
                                                name="AdminTelefon"
                                                label="Telefon"
                                                id="telefonProfesor"
                                                className={classes.root}
                                                value={this.state.Administratori.AdminTelefon}
                                                onChange={(e) => this.onChangeAdmin(e)}
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
                                                    this.updateAdministrator()
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
                <PopUpStergereContAdmin
                    open={this.state.open}
                    onClose={this.handleClose}
                    stergeAdmin={this.stergeAdmin}
                />

            </Container >
        )
    }
}

export default withStyles(styles)(FormVizualizeazaProfilAdmin);
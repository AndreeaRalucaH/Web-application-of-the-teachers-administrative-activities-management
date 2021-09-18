import React, { Component } from 'react'
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alerts from '../../Alerts/Alerts';

import { notitaRoute, profesoriRoute } from '../../Routes/ApiRouter'
import { get, post, postAtasamente, getNotitaProfesorDupaIdProfesorSiIdNotita, updateNotiteDinTabelaProfesori } from '../../Calls/Calls';

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
            textAlign: "center"
        },
        // backgroundColor: colorAppBar,
        // color: "white"
    },
    rootCard: {
        borderRadius: '1rem',
        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

})


class FormAdaugaNotita extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            titluFormular: "Adauga o notita",
            denumireButon: "Adauga",
            Notite: {
                TextNotita: "",
                DataNotita: null,
                ProfesorID: 0
            },


            tipAlerta: "",
            titluAlerta: "",
            textAlerta: "",
            openAlert: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.onChangeNotita = this.onChangeNotita.bind(this);
        // this.getNotitaID = this.getNotitaID.bind(this);
        // this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeTitluFormularSiButon = this.onChangeTitluFormularSiButon.bind(this);
        this.convertDateToStringDate = this.convertDateToStringDate.bind(this);

        this.onHandleClickOpenAlert = this.onHandleClickOpenAlert.bind(this);
        this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);


    }

    handleClose = () => {
        this.setState({ open: false })

    };

    handleOpen = () => {
        this.setState({ open: true })

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
            this.props.onPushNotite()

        }

    }

    onChangeNotita(event) {
        let newNotita = this.state.Notite;
        newNotita[event.target.name] = event.target.value;
        this.setState({ Notite: newNotita });
    }

    async componentDidMount() {
        if (!this.props.idNotita) {
            return
        }
        let notite = await getNotitaProfesorDupaIdProfesorSiIdNotita(this.props.idProf, this.props.idNotita)
        console.log(notite[0].Notite[0])
        this.setState({ Notite: notite[0].Notite[0] })

    }

    convertDateToStringDate(date) {
        let zi = date.slice(0, 2);
        let luna = date.slice(3, 5);
        let an = date.slice(6, 10)
        let data = an + "/" + luna + "/" + zi;
        return data;
    }

    async salveazaNotia() {
        this.state.Notite.ProfesorID = this.props.idProf;
        if (!this.props.idNotita) {
            if (this.state.Notite.DataNotita !== null && this.state.Notite.TextNotita !== "") {
                let dataNotitaNoua = this.convertDateToStringDate(this.state.Notite.DataNotita);
                this.state.Notite.DataNotita = dataNotitaNoua;

                let notita = await post(notitaRoute, this.state.Notite);
                if (notita.hasErrors) {
                    alert(notita.message);
                    return;
                }else{
                    this.setState({ tipAlerta: "success" })
                    this.setState({ titluAlerta: "Succes" })
                    this.setState({ textAlerta: "Notita a fost creata cu succes" })
                    this.onHandleClickOpenAlert();
                }
            } else {
                this.setState({ tipAlerta: "error" })
                this.setState({ titluAlerta: "Eroare" })
                this.setState({ textAlerta: "Toate campurile trebuie completate" })
                this.onHandleClickOpenAlert();
            }


        } else {
            let dataNotitaNoua = this.convertDateToStringDate(this.state.Notite.DataNotita);
            this.state.Notite.DataNotita = dataNotitaNoua;

            let notitaUpdate = await updateNotiteDinTabelaProfesori(profesoriRoute, this.props.idProf, this.props.idNotita, this.state.Notite)
            if (notitaUpdate.hasErrors) {
                alert(notitaUpdate.message);
                return;
            } else {
                this.setState({ tipAlerta: "success" })
                this.setState({ titluAlerta: "Succes" })
                this.setState({ textAlerta: "Notita a fost modificata cu succes" })
                this.onHandleClickOpenAlert();

            }

        }

    }


    onChangeTitluFormularSiButon(titluFormular, denumireButon) {
        if (!this.props.idNotita) {
            return
        }
        this.state.titluFormular = titluFormular;
        this.state.denumireButon = denumireButon;
    }

    render() {
        const { classes } = this.props;
        this.onChangeTitluFormularSiButon("Editeaza notita", "Salveaza")
        return (
            <Container maxWidth="sm" className={classes.container}>
                <form className={classes.form} noValidate>
                    <Card className={classes.rootCard}>
                        <CardHeader title={this.state.titluFormular} className={classes.cardTitle} />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} >
                                    <TextField
                                        label="Data "
                                        name="DataNotita"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={this.state.Notite.DataNotita}
                                        onChange={(e) => this.onChangeNotita(e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={12}
                                        fullWidth
                                        required
                                        label="Aa.."
                                        variant="outlined"
                                        name="TextNotita"
                                        value={this.state.Notite.TextNotita}
                                        onChange={(e) => this.onChangeNotita(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center" spacing={6} >
                                <Grid item xs={12} md={4} >
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.submit}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.salveazaNotia();
                                        }}
                                    >
                                        {this.state.denumireButon}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={4} >
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.submitAnuleaza}
                                        onClick={() => {
                                            this.props.onPushNotite()
                                        }}
                                    >
                                        Anuleaza
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
            </Container>
        )
    }
}

export default withStyles(styles)(FormAdaugaNotita);
import React, { Component } from 'react'
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alerts from '../../Alerts/Alerts.js'

import UploadFile from './UploadFile';
import { activitatiRoute, gestiuneRoute, atasamenteRoute, profesoriRoute, activitatiAtasamenteRoute } from '../../Routes/ApiRouter'
import { get, post, postAtasamente, getActivitatiProfesoriDupaIdActivitate, updateActivitatiDinTabelaProfesori, updateAtasamente } from '../../Calls/Calls';


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
        }
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


class FormAdaugaActivitate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            titluFormular: "Adauga o activitate",
            denumireButon: "Adauga",
            Activitati: {
                DenumireActivitate: "",
                DataInceput: '',
                DataFinal: "",
                TipActivitate: " ",

            },
            Gestiune: {
                ProfesorID: 0,
                ActivitateID: 0,
                VerificareActivitate: "Neverificat",
                PunctajActivitate: 0
            },
            Atasamente: {
                ActivitateID: 0,
                ReferintaAtasament: "",
            },
            idActiv: 0,
            idAtasament: 0,

            tipAlerta: "",
            titluAlerta: "",
            textAlerta: "",
            openAlert: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.onChangeActivitate = this.onChangeActivitate.bind(this);
        this.getActivitateID = this.getActivitateID.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeTitluFormularSiButon = this.onChangeTitluFormularSiButon.bind(this);
        this.convertDateToStringDate = this.convertDateToStringDate.bind(this);
        this.atasareFisier = this.atasareFisier.bind(this)
        this.getAtasamentID = this.getAtasamentID.bind(this);
        this.onHandleClickOpenAlert = this.onHandleClickOpenAlert.bind(this);
        this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);

    }

    handleClose = () => {
        this.setState({ open: false })

    };

    handleOpen = () => {
        this.setState({ open: true })

    }


    onChangeActivitate(event) {
        let newActivitate = this.state.Activitati;
        newActivitate[event.target.name] = event.target.value;
        this.setState({ Activitati: newActivitate });
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
            this.props.onPushActivitati()

        }

    }

    async componentDidMount() {
        if (!this.props.idActivitate) {
            return
        }
        console.log(this.props.idActivitate)
        let activitati = await getActivitatiProfesoriDupaIdActivitate(this.props.idProf, this.props.idActivitate)
        this.setState({ Activitati: activitati[0].Activitati[0] })

    }

    convertDateToStringDate(date) {
        let zi = date.slice(0, 2);
        let luna = date.slice(3, 5);
        let an = date.slice(6, 10)
        let data = an + "/" + luna + "/" + zi;
        return data;
    }

    async salveazaActivitate() {
        if (!this.props.idActivitate) {
            if (this.state.Activitati.DataInceput !== "" && this.state.Activitati.DataFinal !== ""
                && this.state.Activitati.DenumireActivitate !== "" && this.state.Atasamente.ReferintaAtasament.name !== undefined) {
                let dataInceputNoua = this.convertDateToStringDate(this.state.Activitati.DataInceput)
                this.state.Activitati.DataInceput = dataInceputNoua;

                let dataFinalNoua = this.convertDateToStringDate(this.state.Activitati.DataFinal)
                this.state.Activitati.DataFinal = dataFinalNoua;

                let element = await post(activitatiRoute, this.state.Activitati)
                let idActivitate = await this.getActivitateID();
                this.setState({ idActiv: idActivitate })

                this.state.Gestiune.ProfesorID = this.props.idProf;
                this.state.Gestiune.ActivitateID = idActivitate;
                this.state.Atasamente.ActivitateID = idActivitate;

                let elemGestiune = await post(gestiuneRoute, this.state.Gestiune)
                console.log(this.state.Atasamente.ReferintaAtasament)

                if (element.hasErrors || elemGestiune.hasErrors) {
                    alert(element.message);
                    return;
                }
                this.atasareFisier();

                let atasament = await postAtasamente(activitatiAtasamenteRoute, idActivitate, this.state.Atasamente.ReferintaAtasament)
                console.log(atasament)
                let idAtasament = await this.getAtasamentID();
                this.setState({ idAtasament: idAtasament })

                this.setState({ tipAlerta: "success" })
                this.setState({ titluAlerta: "Succes" })
                this.setState({ textAlerta: "Activitatea a fost creata cu succes" })
                this.onHandleClickOpenAlert();


            } else {
                this.setState({ tipAlerta: "error" })
                this.setState({ titluAlerta: "Eroare" })
                this.setState({ textAlerta: "Toate campurile trebuie completate" })
                this.onHandleClickOpenAlert();
            }


        } else {

            let dataInceputNoua = this.convertDateToStringDate(this.state.Activitati.DataInceput)
            this.state.Activitati.DataInceput = dataInceputNoua;

            let dataFinalNoua = this.convertDateToStringDate(this.state.Activitati.DataFinal)
            this.state.Activitati.DataFinal = dataFinalNoua;

            let activitatiUpdatate = await updateActivitatiDinTabelaProfesori(profesoriRoute, this.props.idProf,
                this.props.idActivitate, this.state.Activitati)
            console.log(this.props.idAtasament)

            if (this.props.idAtasament !== "0") {
                this.atasareFisier();
                console.log(this.state.Atasamente.ReferintaAtasament.get("fisier"))
                if (this.state.Atasamente.ReferintaAtasament.get("fisier") !== "") {
                    let atasamenteUpdate = await updateAtasamente(atasamenteRoute, this.props.idAtasament,
                        this.props.idActivitate, this.state.Atasamente.ReferintaAtasament)
                    if (atasamenteUpdate.hasErrors) {
                        alert(atasamenteUpdate.message);
                        return;
                    }
                } 
            } else {
                this.atasareFisier();
                let atasament = await postAtasamente(activitatiAtasamenteRoute, this.props.idActivitate, this.state.Atasamente.ReferintaAtasament)
                if (atasament.hasErrors) {
                    alert(atasament.message);
                    return;
                }

            }

            if (activitatiUpdatate.hasErrors) {
                alert(activitatiUpdatate.message);
                return;
            }
            this.setState({ tipAlerta: "success" })
            this.setState({ titluAlerta: "Succes" })
            this.setState({ textAlerta: "Activitatea a fost modificata cu succes" })
            this.onHandleClickOpenAlert();
        }

    }


    async getActivitateID() {
        let activ = await get(activitatiRoute)
        activ = activ[activ.length - 1].ActivitateID
        console.log(activ)
        return activ;
    }

    async getAtasamentID() {
        let atasament = await get(atasamenteRoute)
        atasament = atasament[atasament.length - 1].AtasamentID
        console.log(atasament)
        return atasament;
    }

    async onChangeFile(file) {
        this.state.Atasamente.ReferintaAtasament = file;
        // console.log(this.state.Atasamente.ReferintaAtasament)
    }

    onChangeTitluFormularSiButon(titluFormular, denumireButon) {
        if (!this.props.idActivitate) {
            return
        }
        this.state.titluFormular = titluFormular;
        this.state.denumireButon = denumireButon;
    }

    atasareFisier() {
        const formData = new FormData();

        console.log(this.state.Atasamente.ReferintaAtasament)
        formData.append('fisier', this.state.Atasamente.ReferintaAtasament)
        this.state.Atasamente.ReferintaAtasament = formData

        console.log(this.state.Atasamente.ReferintaAtasament.entries())


    }

    render() {
        const { classes } = this.props;
        this.onChangeTitluFormularSiButon("Editeaza activitatea", "Salveaza")
        return (
            <Container maxWidth="sm" className={classes.container}>
                <form className={classes.form} noValidate>
                    <Card className={classes.rootCard}>
                        <CardHeader title={this.state.titluFormular} className={classes.cardTitle} />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Data inceput"
                                        name="DataInceput"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={this.state.Activitati.DataInceput}
                                        onChange={(e) => this.onChangeActivitate(e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="filled-required"
                                        label="Data final"
                                        name="DataFinal"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={this.state.Activitati.DataFinal}
                                        onChange={(e) => this.onChangeActivitate(e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <FormControl className={classes.formControl} >
                                        <InputLabel id="demo-controlled-open-select-label">Tip activitate</InputLabel>
                                        <Select
                                            open={this.state.open}
                                            onClose={this.handleClose}
                                            onOpen={this.handleOpen}
                                            value={this.state.Activitati.TipActivitate}
                                            onChange={(e) => this.onChangeActivitate(e)}
                                            inputProps={{
                                                name: 'TipActivitate',
                                                id: 'demo-controlled-open-select'
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={"Licenta"}>Licenta</MenuItem>
                                            <MenuItem value={"Disertatie"}>Disertatie</MenuItem>
                                            <MenuItem value={"Doctorat"}>Doctorat</MenuItem>
                                            <MenuItem value={"Altele"}>Altele</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={12}
                                        fullWidth
                                        required
                                        label="Denumire activitate"
                                        variant="outlined"
                                        name="DenumireActivitate"
                                        value={this.state.Activitati.DenumireActivitate}
                                        onChange={(e) => this.onChangeActivitate(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="flex-start">
                                <Grid item sm={4} className={classes.upload}>
                                    <UploadFile atasament={this.state.Atasamente.ReferintaAtasament} onChangeFiles={this.onChangeFile} />
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
                                            this.salveazaActivitate();
                                            // console.log(this.state.idAtasament)
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
                                        onClick={(e) => {
                                            this.props.onPushActivitati()
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

export default withStyles(styles)(FormAdaugaActivitate);
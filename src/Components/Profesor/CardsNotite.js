import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Trash, Pencil } from 'react-bootstrap-icons/build/index.js';
import Tooltip from '@material-ui/core/Tooltip';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import PopUpAfiseazaDetaliiActivitati from './PopUpAfiseazaDetaliiActivitati';
import Alerts from '../../Alerts/Alerts';

import "../Profesor/Style/Cards.css";
import "../Profesor/Style/HoverText.css";

import { post, get } from '../../Calls/Calls';
import { activitatiRoute, gestiuneRoute, notitaProfRoute } from '../../Routes/ApiRouter';
import PopUpAfiseazaDetaliiNotite from './PopUpAfiseazaDetaliiNotite';

const colorIcons = "#61A0AF"

const styles = theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    rootCard: {
        borderRadius: '1rem',
        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
        // minWidth: 600,
    },
    trashIcon: {
        float: 'right',
        color: colorIcons,
        fontSize: 22,
        height: 50,
    },
    pencilIcon: {
        float: 'right',
        color: colorIcons,
        fontSize: 22,
        height: 50,
        marginRight: theme.spacing(1)
    },
    chip: {
        float: 'left',
        backgroundColor: colorIcons,
        marginTop: theme.spacing(1),
        color: "white"
    },
    // chipRed: {
    //     float: 'left',
    //     backgroundColor: "#bc4749",
    //     marginTop: theme.spacing(1),
    //     color: "white"
    // },

})

class CardsNotite extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            Activitati: {
                DenumireActivitate: "",
                DataInceput: null,
                DataFinal: new Date(),
                TipActivitate: ""
            },
            Gestiune: {
                ProfesorID: 0,
                ActivitateID: 0,
                VerificareActivitate: "Neverificat",
            },
            idActivitate: 0,
            textNotita: "",
            dataNotita: null,

            tipAlerta: "",
            titluAlerta: "",
            textAlerta: "",
            openAlert: false,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getActivitateID = this.getActivitateID.bind(this);
        this.adaugaLaActivitati = this.adaugaLaActivitati.bind(this);
        this.onHandleClickOpenAlert = this.onHandleClickOpenAlert.bind(this);
        this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);
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

    }


    convertDateToStringDate(date) {
        let zi = date.slice(0, 2);
        let luna = date.slice(3, 5);
        let an = date.slice(6, 10)
        let data = an + "/" + luna + "/" + zi;
        return data;
    }

    convertDate(date) {
        console.log(date)
        let zi = date.getDate()
        console.log(zi)
        let luna = date.getMonth()
        let an = date.getFullYear()
        let data = an + "/" + luna + "/" + zi;
        return data;
    }

    async adaugaLaActivitati(textNotita, dataNotita) {
        this.state.Activitati.DenumireActivitate = textNotita;
        let dataInceputNoua = this.convertDateToStringDate(dataNotita)
        this.state.Activitati.DataInceput = dataInceputNoua;

        this.state.Activitati.DataFinal = new Date();
        let dataFinalNoua = this.convertDate(this.state.Activitati.DataFinal)
        this.state.Activitati.DataFinal = dataFinalNoua

        if (this.state.Activitati.DenumireActivitate !== "" && this.state.Activitati.DataInceput !== null) {
            let element = await post(activitatiRoute, this.state.Activitati)
            let idActivitate = await this.getActivitateID();
            console.log(element)
            console.log(idActivitate)
            this.setState({ idActivitate: idActivitate })

            this.state.Gestiune.ProfesorID = this.props.idProf;
            this.state.Gestiune.ActivitateID = idActivitate;

            let elemGestiune = await post(gestiuneRoute, this.state.Gestiune)

            if (element.hasErrors || elemGestiune.hasErrors) {
                alert(element.message);
                return;
            } else {
                this.setState({ tipAlerta: "success" })
                this.setState({ titluAlerta: "Succes" })
                this.setState({ textAlerta: "Notita a fost adaugata cu succes" })
                this.onHandleClickOpenAlert();
            }
        } else {
            this.setState({ tipAlerta: "error" })
            this.setState({ titluAlerta: "Eroare" })
            this.setState({ textAlerta: "Nu exista suficiente date pentru a fi adaugata la activitati" })
            this.onHandleClickOpenAlert();
        }


    }

    async getActivitateID() {
        let activ = await get(activitatiRoute)
        console.log(activ)
        activ = activ[activ.length - 1].ActivitateID
        console.log(typeof activ)
        return activ;
    }

    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={4}>
                    {this.props.notite.map((notita, index) => (
                        <Grid item xs={12} md={6} key={notita.NotitaID}>
                            <Card className={classes.rootCard} >
                                <CardActionArea  >
                                    <CardContent >
                                        <div onClick={() => {
                                            this.handleClickOpen()
                                            this.setState({ textNotita: notita.TextNotita })
                                            this.setState({ dataNotita: notita.DataNotita })
                                        }}>
                                            <Typography noWrap gutterBottom variant="h6" component="h2">
                                                {notita.TextNotita}
                                            </Typography>
                                            {/* <Divider /> */}
                                            <Typography gutterBottom display="inline" variant="subtitle1" component="h2">
                                                {"Data: "} { } {notita.DataNotita}
                                            </Typography>
                                        </div>

                                        <Divider />
                                        <div>
                                            <Tooltip title="Sterge">
                                                <Trash className={classes.trashIcon} onClick={() => { this.props.stergeNotite(notita.NotitaID, index) }} />
                                            </Tooltip>
                                            <Grid item xs={3} sm={12}>
                                                <Tooltip title="Editeaza">
                                                    <Pencil
                                                        className={classes.pencilIcon}
                                                        onClick={() => {
                                                            this.props.onChangeIdNotita(notita.NotitaID)
                                                            this.props.onPushEditare();
                                                        }}
                                                    ></Pencil>
                                                </Tooltip>
                                            </Grid>
                                        </div>
                                        <Chip label={"Adauga ca activitate"} onClick={() => {
                                            this.adaugaLaActivitati(notita.TextNotita, notita.DataNotita)
                                            this.props.stergeNotite(notita.NotitaID, index)
                                        }} className={classes.chip} />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <PopUpAfiseazaDetaliiNotite
                    open={this.state.open}
                    onClose={this.handleClose}
                    textNotita={this.state.textNotita}
                    dataNotita={this.state.dataNotita}
                />
                <Alerts
                    tipAlerta={this.state.tipAlerta}
                    textAlerta={this.state.textAlerta}
                    titluAlerta={this.state.titluAlerta}
                    openAlert={this.state.openAlert}
                    onClose={this.onHandleCloseAlert}
                ></Alerts>
            </Container >
        )
    }
}

export default withStyles(styles)(CardsNotite);
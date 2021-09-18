import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CardsActivitati from './CardsActivitati';
import Grid from '@material-ui/core/Grid';
import DialogContentText from '@material-ui/core/DialogContentText';
import ExportaPDF from './ButonPDF';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alerts from '../../Alerts/Alerts'

//Date pickers -- material-ui
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import { profesoriRoute, activitateProfRoute, adminiRoute, activitatiRoute } from '../../Routes/ApiRouter'
import { get, getTipActivitate, getActivitateDupaAn, getActivitatiDupaAnSiStatus, remove } from '../../Calls/Calls';
import { Card, CardContent, CardHeader, Container, Divider } from '@material-ui/core';


const theme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: { backgroundColor: "#30475e", },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                backgroundColor: "white",
                color: "#1b5e20",
            },
        }
    },

    typography: {
        fontFamily: [
            'Chilanka',
            'cursive',
        ].join(','),
    },

})

const colorIcons = '#30475e'

const styles = theme => ({
    button: {
        display: 'inline',
        marginTop: theme.spacing(1),
    },
    formControl: {
        marginButtom: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: -10,
        minWidth: 200
    },
    submit: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(1),
        backgroundColor: '#61A0AF',
        color: "white",
        fontSize: 13,
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    cardTitle: {
        '& .MuiCardHeader-title': {
            textAlign: "center",
            fontSize: 20
        }
    },
    rootCard: {
        borderRadius: '0rem',
        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
        maxHeight: 80

    },
    formCheckButton: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
});

class FiltreazaActivitati extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openProf: false,
            openTip: false,
            openData: false,
            checkTotiAnii: false,
            disabledCalendar: false,
            profID: '',
            tipActivitate: '',
            dataActivitate: new Date(),
            activitati: [],
            administrator: [],

            tipAlerta: "",
            titluAlerta: "",
            textAlerta: "",
            openAlert: false,
        }

        this.handleCloseProf = this.handleCloseProf.bind(this);
        this.handleOpenProf = this.handleOpenProf.bind(this);
        this.handleCloseTip = this.handleCloseTip.bind(this);
        this.handleOpenTip = this.handleOpenTip.bind(this);
        this.afiseazaActiv = this.afiseazaActiv.bind(this);
        this.onHandleChangeProf = this.onHandleChangeProf.bind(this);
        this.onHandleChangeTip = this.onHandleChangeTip.bind(this);

        this.onHandleChangeData = this.onHandleChangeData.bind(this);
        this.handleCloseData = this.handleCloseData.bind(this);
        this.handleOpenData = this.handleOpenData.bind(this);
        this.onHandleChangeCheckTotiAnii = this.onHandleChangeCheckTotiAnii.bind(this);
        this.deleteActivitate = this.deleteActivitate.bind(this);

        this.onHandleClickOpenAlert = this.onHandleClickOpenAlert.bind(this);
        this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);

    }

    onHandleChangeData(date) {
        this.setState({ dataActivitate: date })
    }

    handleCloseData = () => {
        this.setState({ openData: false })
    };

    handleOpenData = () => {
        this.setState({ openData: true })
    }

    onHandleChangeProf(event) {
        this.setState({ profID: event.target.value })
    }

    onHandleChangeTip(event) {
        this.setState({ tipActivitate: event.target.value })
    }

    handleCloseProf = () => {
        this.setState({ openProf: false })

    };

    handleOpenProf = () => {
        this.setState({ openProf: true })

    }

    handleCloseTip = () => {
        this.setState({ openTip: false })

    };

    handleOpenTip = () => {
        this.setState({ openTip: true })

    }

    onHandleChangeCheckTotiAnii = name => event => {
        this.setState({ [name]: event.target.checked })
        console.log(event.target.checked)
        this.setState({ disabledCalendar: event.target.checked })
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

    async afiseazaActiv() {
        if (this.state.profID !== '') {
            let activitatiProfesori = await get(activitateProfRoute, this.state.profID); //activitati profesori
            let dataActivitate = await getActivitateDupaAn(this.state.profID, this.state.dataActivitate.getFullYear()); //activitati dupa an
            if (activitatiProfesori === undefined || activitatiProfesori.length === 0) { //verific daca are activitati profesorul
                this.setState({ tipAlerta: "warning" })
                this.setState({ titluAlerta: "Atentie" })
                this.setState({ textAlerta: "Nu exista activitati pentru acest profesor" })
                this.onHandleClickOpenAlert();
            } else {
                this.setState({ profesor: activitatiProfesori[0].Profesori })
                console.log(activitatiProfesori[0].Profesori[0].AdministratorID);
                let administrator = await get(adminiRoute, activitatiProfesori[0].Profesori[0].AdministratorID)
                console.log(administrator)
                this.setState({ administrator: administrator })
                if (this.state.tipActivitate === "Toate" || this.state.tipActivitate === '') {
                    if (this.state.disabledCalendar === false) {
                        if (dataActivitate === undefined || dataActivitate.length === 0) {
                            this.setState({ tipAlerta: "warning" })
                            this.setState({ titluAlerta: "Atentie" })
                            this.setState({ textAlerta: "Nu exista activitati in acest an" })
                            this.onHandleClickOpenAlert();
                        } else {
                            this.setState({ activitati: dataActivitate });
                            console.log(dataActivitate)
                        }

                    } else {
                        this.setState({ activitati: activitatiProfesori });
                    }
                }
                else {
                    if (this.state.disabledCalendar === false) {
                        if (dataActivitate === undefined || dataActivitate.length === 0) {
                            this.setState({ tipAlerta: "warning" })
                            this.setState({ titluAlerta: "Atentie" })
                            this.setState({ textAlerta: "Nu exista activitati in acest an" })
                            this.onHandleClickOpenAlert();
                        } else {
                            let activitatiDupaAnSiStatus = await getActivitatiDupaAnSiStatus(this.state.profID, this.state.dataActivitate.getFullYear(), this.state.tipActivitate);
                            if (activitatiDupaAnSiStatus === undefined || activitatiDupaAnSiStatus.length === 0) {
                                this.setState({ tipAlerta: "warning" })
                                this.setState({ titluAlerta: "Atentie" })
                                this.setState({ textAlerta: "Nu exista activitati" + " " + this.state.tipActivitate + "e" })
                                this.onHandleClickOpenAlert();
                            } else {
                                this.setState({ activitati: activitatiDupaAnSiStatus });
                                console.log(activitatiDupaAnSiStatus)
                            }

                        }
                    } else {
                        let activitatiDupaStatus = await getTipActivitate(this.state.profID, this.state.tipActivitate)
                        console.log(activitatiDupaStatus)
                        if (activitatiDupaStatus === undefined || activitatiDupaStatus.length === 0) {
                            this.setState({ tipAlerta: "warning" })
                            this.setState({ titluAlerta: "Atentie" })
                            this.setState({ textAlerta: "Nu exista activitati" + " " + this.state.tipActivitate + "e" })
                            this.onHandleClickOpenAlert();
                        } else {
                            this.setState({ activitati: activitatiDupaStatus });
                        }
                    }

                }
            }
        } else {
            this.setState({ tipAlerta: "warning" })
            this.setState({ titluAlerta: "Atentie" })
            this.setState({ textAlerta: "Alege un profesor" })
            this.onHandleClickOpenAlert();
            console.log(this.state.profID)
        }
    }

    async afiseazaActivitatiFiltrateDupaData() {
        let dataActivitate = await getActivitateDupaAn(this.state.profID, this.state.dataActivitate.getFullYear());
        if (dataActivitate[0] === undefined || dataActivitate[0].Activitati.length === 0) {
            alert("Nu exista activitati in anul selectat")
        } else {
            this.setState({ activitati: dataActivitate[0].Activitati });
            console.log(dataActivitate[0].Activitati)
        }
    }

    async deleteActivitate(idActivitate, index) {
        let activitate = await remove(activitatiRoute, idActivitate);
        if (activitate.hasErrors) {
            alert(activitate.message);
            return;
        }

        let activs = this.state.activitati;
        activs.splice(index, 1);
        this.setState({ activitati: activs });
    }


    render() {
        const { classes } = this.props;
        console.log(this.state.profID)
        return (
            <div>
                <Container maxWidth="lg" className={classes.container}>
                    <Card className={classes.rootCard}>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md >
                                    <FormControl className={classes.formControl} >
                                        <InputLabel id="demo-controlled-open-select-label">Profesori</InputLabel>

                                        <Select

                                            open={this.state.openProf}
                                            onClose={this.handleCloseProf}
                                            onOpen={this.handleOpenProf}
                                            value={this.state.profID}
                                            onChange={this.onHandleChangeProf}
                                            inputProps={{
                                                name: 'profID',
                                                id: 'demo-controlled-open-select'
                                            }}
                                        >
                                            {this.props.profesori.map((profs, index) =>
                                                <MenuItem key={profs.ProfesorID} value={profs.ProfesorID} >{profs.NumeProfesor} {profs.PrenumeProfesor}</MenuItem>

                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md >
                                    <FormControl className={classes.formControl} >
                                        <InputLabel id="demo-controlled-open-select-label1">Tip activitate</InputLabel>
                                        <Select
                                            open={this.state.open}
                                            onClose={this.handleCloseTip}
                                            onOpen={this.handleOpenTip}
                                            value={this.state.tipActivitate}
                                            onChange={this.onHandleChangeTip}
                                            inputProps={{
                                                name: 'tipActivitate',
                                                id: 'demo-controlled-open-select1'
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Toate</em>
                                            </MenuItem>
                                            <MenuItem value={"Verificat"}>Verificat</MenuItem>
                                            <MenuItem value={"Neverificat"}>Neverificat</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md >
                                    <FormControl className={classes.formControl} >
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <ThemeProvider theme={theme}>
                                                <KeyboardDatePicker
                                                    autoOk
                                                    id="dialog_anii_activitati"
                                                    disabled={this.state.disabledCalendar}
                                                    variant="dialog"
                                                    openTo="year"
                                                    views={["year"]}
                                                    margin="normal"
                                                    value={this.state.dataActivitate}
                                                    onChange={this.onHandleChangeData}
                                                />
                                            </ThemeProvider>
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md >
                                    <FormControlLabel className={classes.formCheckButton}
                                        control={
                                            <Checkbox
                                                checked={this.state.checkTotiAnii}
                                                onChange={this.onHandleChangeCheckTotiAnii("checkTotiAnii")}
                                                name="checkTotiAnii"
                                                className={classes.checkBox}
                                                style={{ color: "#61A0AF" }}
                                            />
                                        }
                                        label="Toti anii"
                                    />
                                </Grid>
                                <Grid item xs={12} md >
                                    <ExportaPDF profesori={this.state.profesor} activitati={this.state.activitati} administrator={this.state.administrator}></ExportaPDF>
                                </Grid>
                                <Grid item xs={12} md >
                                    <Button onClick={() => { this.afiseazaActiv() }} className={classes.submit}>Afiseaza activitati</Button>
                                </Grid>
                            </Grid>
                        </CardContent>

                    </Card>
                </Container>

                <CardsActivitati activitati={this.state.activitati} afiseazaActivitate={this.afiseazaActiv} onDelete={this.deleteActivitate} />
                <Alerts
                    tipAlerta={this.state.tipAlerta}
                    textAlerta={this.state.textAlerta}
                    titluAlerta={this.state.titluAlerta}
                    openAlert={this.state.openAlert}
                    onClose={this.onHandleCloseAlert}
                ></Alerts>
            </div>
        );
    }

}

export default withStyles(styles)(FiltreazaActivitati);
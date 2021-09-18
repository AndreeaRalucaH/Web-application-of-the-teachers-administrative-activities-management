import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import Alerts from '../../Alerts/Alerts';

//Date pickers -- material-ui
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

//Call database
import { profesoriRoute } from '../../Routes/ApiRouter'
import { get, getTipActivitate, getActivitateDupaAn, getActivitatiDupaAnSiStatus } from '../../Calls/Calls';

const colorAppBar = '#30475e'
const colorMain = '#ececec'

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

const styles = theme => ({
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    button: {
        // backgroundColor: "#61A0AF",
        backgroundColor: "#FBFBFF",
        color: "black",

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,

    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: colorMain
    },
    rootCard: {
        borderRadius: '1rem',
        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
        overflow: 'hidden',
    },
    submit: {
        backgroundColor: "#61A0AF",
        color: "white",

    },
    root: {
        backgroundColor: "#FBFBFF"
    },
})

class PopUpFiltreazaActivitatiProfesori extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            openTip: false,
            openData: false,
            statusActivitate: '',
            dataActivitate: new Date(),
            contor: false,

            tipAlerta: "",
            titluAlerta: "",
            textAlerta: "",
            openAlert: false,
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseTip = this.handleCloseTip.bind(this);
        this.handleOpenTip = this.handleOpenTip.bind(this);
        this.onHandleChangeTip = this.onHandleChangeTip.bind(this);

        this.onHandleChangeData = this.onHandleChangeData.bind(this);
        this.handleCloseData = this.handleCloseData.bind(this);
        this.handleOpenData = this.handleOpenData.bind(this);

        this.onHandleClickOpenAlert = this.onHandleClickOpenAlert.bind(this);
        this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);
    }

    onHandleChangeTip(event) {
        this.setState({ statusActivitate: event.target.value })
    }

    onHandleChangeData(date) {
        this.setState({ dataActivitate: date })
    }

    handleClickOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
    }

    handleCloseTip = () => {
        this.setState({ openTip: false })
    };

    handleOpenTip = () => {
        this.setState({ openTip: true })
    }

    handleCloseData = () => {
        this.setState({ openData: false })
    };

    handleOpenData = () => {
        this.setState({ openData: true })
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

    async afiseazaActivitatiFiltrateDupaStatusSiAn() {
        let activitatiDinAnulCurent = await getActivitateDupaAn(this.props.idProf, this.state.dataActivitate.getFullYear());
        console.log(activitatiDinAnulCurent)
        if (this.state.statusActivitate === '' || this.state.statusActivitate === "Toate") {
            if (activitatiDinAnulCurent === undefined || activitatiDinAnulCurent.length === 0) {
                this.setState({ tipAlerta: "warning" })
                this.setState({ titluAlerta: "Atentie" })
                this.setState({ textAlerta: "Nu exista activitati in anul selectat" })
                this.onHandleClickOpenAlert();
            } else {
                this.props.onChangeActivitati(activitatiDinAnulCurent);
            }
        } else {
            //activitati dupa an si status   
            let activitatiDupaAnSiStatus = await getActivitatiDupaAnSiStatus(this.props.idProf, this.state.dataActivitate.getFullYear(), this.state.statusActivitate);
            console.log(activitatiDupaAnSiStatus)
            if (activitatiDinAnulCurent === undefined || activitatiDinAnulCurent.length === 0) {
                this.setState({ tipAlerta: "warning" })
                this.setState({ titluAlerta: "Atentie" })
                this.setState({ textAlerta: "Nu exista activitati in anul selectat" })
                this.onHandleClickOpenAlert();
            } else {
                if (activitatiDupaAnSiStatus === undefined || activitatiDupaAnSiStatus.length === 0) {
                    this.setState({ tipAlerta: "warning" })
                    this.setState({ titluAlerta: "Atentie" })
                    this.setState({ textAlerta: "Nu exista activitati" + " " + this.state.statusActivitate + "e" })
                    this.onHandleClickOpenAlert();
                } else {
                    this.props.onChangeActivitati(activitatiDupaAnSiStatus);
                }
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container maxWidth="lg" className={classes.container}>
                    <Button variant="outlined" startIcon={<FilterListIcon />} className={classes.button} onClick={this.handleClickOpen}>
                        {/* <FilterListIcon></FilterListIcon>  */} Filtreaza Activitati
                    </Button>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" className={classes.root}>Filtre disponibile</DialogTitle>
                        <DialogContent style={{ overflow: "hidden" }} className={classes.root}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <DialogContentText>
                                        Status activitate
                                    </DialogContentText>
                                    <FormControl className={classes.formControl} >
                                        <InputLabel id="demo-controlled-open-select-label1">Status activitate</InputLabel>
                                        <Select
                                            open={this.state.openTip}
                                            onClose={this.handleCloseTip}
                                            onOpen={this.handleOpenTip}
                                            value={this.state.statusActivitate}
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
                                <Grid item xs={12} sm={6}>
                                    <DialogContentText>
                                        Data activitatii
                                    </DialogContentText>
                                    <FormControl className={classes.formControl} >
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <ThemeProvider theme={theme}>
                                                <KeyboardDatePicker
                                                    autoOk
                                                    // id="date-picker-dialog"
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
                            </Grid>
                        </DialogContent>
                        <DialogActions className={classes.root}>
                            <Button onClick={this.handleClose} className={classes.submit}>
                                Cancel
                            </Button>
                            <Button onClick={() => {
                                // this.afiseazaActivitatiFiltrateDupaStatus()
                                // this.afiseazaActivitatiFiltrateDupaData()
                                this.afiseazaActivitatiFiltrateDupaStatusSiAn()
                                this.handleClose()
                            }} className={classes.submit}>
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Alerts
                        tipAlerta={this.state.tipAlerta}
                        textAlerta={this.state.textAlerta}
                        titluAlerta={this.state.titluAlerta}
                        openAlert={this.state.openAlert}
                        onClose={this.onHandleCloseAlert}
                    ></Alerts>
                </Container>

            </div>
        );
    }

}

export default withStyles(styles)(PopUpFiltreazaActivitatiProfesori)
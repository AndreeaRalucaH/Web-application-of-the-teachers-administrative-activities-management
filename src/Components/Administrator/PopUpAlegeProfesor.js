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
import { PersonLinesFill } from 'react-bootstrap-icons/build';
import Grafice from '../../Charts/Charts'


//Date pickers -- material-ui
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

//Call database
import { profesoriRoute, activitatiOrdonateDupaData } from '../../Routes/ApiRouter'
import { get, getTipActivitate, getActivitateDupaAn, getActivitatiDupaAnSiStatus, getNrActivitatiPeAnDupaIdProf, getNrActivitatiPeAnDupaIdProfSiTipActivitate } from '../../Calls/Calls';

const colorAppBar = '#30475e'
const colorMain = '#ececec'

// const theme = createMuiTheme({
//     overrides: {
//         MuiPickersToolbar: {
//             toolbar: { backgroundColor: "#30475e", },
//         },
//         MuiPickersCalendarHeader: {
//             switchHeader: {
//                 backgroundColor: "white",
//                 color: "#1b5e20",
//             },
//         }
//     },
//     typography: {
//         fontFamily: [
//             'Chilanka',
//             'cursive',
//         ].join(','),
//         fontSize: 16
//     },
// })

const styles = theme => ({
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    button: {
        // backgroundColor: "#61A0AF",
        backgroundColor: "#FBFBFF",
        color: "black",
        // fontSize: 16

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

class PopUpAlegeProfesor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            openIdProf: false,
            idProfesor: 0,
            animation: true,
            // displayTitle: true,

            chartData: {},
            activitati: [],
            anArray: [],
            aniUnici: [],
            nrActivitatiPeAn: [],
            ani: [],
            numaractiv: [],
            graficDate: {},
            graficPieDate: {},

            numarActivitatiDupaTipAnCurent: [],
            tipActivitate: [],
            nrActivDupaTip: [],

            onClickGrafic: false,
            onClickEvolutie: false,
            onClickStatusActiv: false,

            tipAlerta: "",
            titluAlerta: "",
            textAlerta: "",
            openAlert: false,
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseIdProf = this.handleCloseIdProf.bind(this);
        this.handleOpenIdProf = this.handleOpenIdProf.bind(this);
        // this.onHandleChangeProfId = this.onHandleChangeProfId.bind(this);

        this.onHandleClickOpenAlert = this.onHandleClickOpenAlert.bind(this);
        this.onHandleCloseAlert = this.onHandleCloseAlert.bind(this);
        this.onHandleChangeIdProf = this.onHandleChangeIdProf.bind(this);

        this.afiseazaGrafic = this.afiseazaGrafic.bind(this);
        this.afiseazaEvolutie = this.afiseazaEvolutie.bind(this);
        this.afiseazaPieChart = this.afiseazaPieChart.bind(this);
        this.getNrActivitatiDupaTip = this.getNrActivitatiDupaTip.bind(this);
        this.getAniSiNrActivitati = this.getAniSiNrActivitati.bind(this);

        this.onChangeClickGrafic = this.onChangeClickGrafic.bind(this);
        this.onChangeEvolutie = this.onChangeClickNrActivTotale.bind(this);
        this.onChangeClickStatusActiv = this.onChangeClickStatusActiv.bind(this)
        this.onHandleChangeAnimation = this.onHandleChangeAnimation.bind(this);
    }

    onChangeClickGrafic() {
        this.setState({ onClickGrafic: true })
        this.setState({ onClickEvolutie: false })
        this.setState({ onClickStatusActiv: false })
    }

    onChangeClickNrActivTotale() {
        this.setState({ onClickGrafic: false })
        this.setState({ onClickEvolutie: true })
        this.setState({ onClickStatusActiv: false })
    }

    onChangeClickStatusActiv() {
        this.setState({ onClickGrafic: false })
        this.setState({ onClickEvolutie: false })
        this.setState({ onClickStatusActiv: true })
    }

    removeDuplicates(array) {
        let newArray = Array.from(new Set(array));
        return newArray;
    }

    onHandleChangeIdProf(event) {
        this.setState({ idProfesor: event.target.value })
    }

    handleClickOpen() {
        this.setState({ open: true })
        
    }

    handleClose() {
        this.setState({ open: false })
        
    }

    handleCloseIdProf = () => {
        this.setState({ openIdProf: false })
    };

    handleOpenIdProf = () => {
        this.setState({ openIdProf: true })
        // this.state.displayTitle = false;
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

    onHandleChangeAnimation() {
        if (this.state.open === false) {
            this.state.animation = false;
           
        }
        else {
            this.state.animation = true
        }
    }

    // onHandleChangeProfId(idProf) {
    //     this.setState({ idProfesor: idProf })
    // }


    // onSubmit() {
    //     this.props.onHandleChangeIdProf(this.state.idProfesor)
    //     // this.getNrActivitatiDupaTip();
    //     // this.getAniSiNrActivitati();

    //     this.props.onPushProfesorSelectat()
    // }

    async getAniSiNrActivitati() {
        let activitati = await get(activitatiOrdonateDupaData, this.state.idProfesor);
        this.setState({ activitati: activitati })
        console.log(this.state.activitati)
        let newArray = this.state.anArray
        this.state.activitati.forEach(element => {
            let an = element.DataInceput.slice(6, 10)
            newArray.push(an)
        });
        this.setState({ anArray: newArray })
        let uniqueYears = this.removeDuplicates(this.state.anArray)
        this.setState({ aniUnici: uniqueYears })

        let newNrActivPeAn = this.state.nrActivitatiPeAn;
        for (let an of this.state.aniUnici) {
            let numar = await getNrActivitatiPeAnDupaIdProf(this.state.idProfesor, an)
            newNrActivPeAn.push({ an: an, numar: numar })
        }
        this.setState({ nrActivitatiPeAn: newNrActivPeAn })

        let newAni = this.state.ani;
        let newNumarActiv = this.state.numaractiv;
        this.state.nrActivitatiPeAn.forEach(element => {
            newAni.push(element.an);
            newNumarActiv.push(element.numar)

        });
        this.setState({ ani: newAni });
        this.setState({ numaractiv: newNumarActiv })

        console.log(this.state.ani)
        console.log(this.state.numaractiv)
    }

    async getNrActivitatiDupaTip() {
        let dataCurenta = new Date();
        let anCurent = dataCurenta.getFullYear();

        let newNumarActivitatiDupaTipAnCurent = this.state.numarActivitatiDupaTipAnCurent;
        let activitatiAnCurentVerificate = await getNrActivitatiPeAnDupaIdProfSiTipActivitate(this.state.idProfesor, anCurent, "Verificat")
        console.log(activitatiAnCurentVerificate)
        newNumarActivitatiDupaTipAnCurent.push({ tip: "Verificate", numar: activitatiAnCurentVerificate })

        let activitatiAnCurentNeverificate = await getNrActivitatiPeAnDupaIdProfSiTipActivitate(this.state.idProfesor, anCurent, "Neverificat")
        newNumarActivitatiDupaTipAnCurent.push({ tip: "Neverificate", numar: activitatiAnCurentNeverificate })

        this.setState({ numarActivitatiDupaTipAnCurent: newNumarActivitatiDupaTipAnCurent })
        // console.log(this.state.numarActivitatiDupaTipAnCurent)

        let newTipActivitate = this.state.tipActivitate;
        let newNrActivDupaTip = this.state.nrActivDupaTip;
        this.state.numarActivitatiDupaTipAnCurent.forEach(element => {
            newTipActivitate.push(element.tip);
            newNrActivDupaTip.push(element.numar);
        });
        this.setState({ tipActivitate: newTipActivitate })
        this.setState({ nrActivDupaTip: newNrActivDupaTip })

    }

    afiseazaGrafic() {
        this.onChangeClickGrafic();
        let graficDate = {
            labels: this.state.ani,
            datasets: [{
                label: 'Numar activitati',
                data: this.state.numaractiv,
                backgroundColor: [
                    'rgba(185, 141, 141, 0.6)',
                    'rgba(244, 161, 123, 0.6)',
                    'rgba(97, 160, 175, 0.6)',
                    'rgba(140, 186, 144, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ]
            }]
        }
        console.log(graficDate)
        this.setState({ graficDate: graficDate })
    }

    afiseazaEvolutie() {
        this.onChangeEvolutie()
        let graficDate = {
            labels: this.state.ani,
            datasets: [{
                label: 'Numar activitati',
                data: this.state.numaractiv,
                fill: true,
                backgroundColor: 'rgba(97, 160, 175, 0.6)',

            }]
        }
        console.log(graficDate)
        this.setState({ graficDate: graficDate })
    }

    afiseazaPieChart() {
        this.onChangeClickStatusActiv();
        let graficDate = {
            labels: this.state.tipActivitate,
            datasets: [{
                label: 'Numar activitati',
                data: this.state.nrActivDupaTip,
                backgroundColor: [
                    'rgba(140, 186, 144, 0.6)',
                    'rgba(237, 49, 49, 0.6)',

                ]
            }]
        }
        console.log(graficDate)
        this.setState({ graficPieDate: graficDate })
    }


    render() {
        const { classes } = this.props;
        // console.log(this.props.profesori)
        console.log(this.state.idProfesor)
        return (
            <div>
                <Container maxWidth="lg" className={classes.container}>
                    <Button variant="outlined" startIcon={<PersonLinesFill />} className={classes.button}
                        onClick={() => {
                            
                            this.onHandleChangeAnimation();
                            this.handleClickOpen(); 
                            console.log(this.state.animation)
                            console.log(this.state.open)

                        }}>
                        Alege cadrul didactic
                    </Button>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" className={classes.root}>Filtre disponibile</DialogTitle>
                        <DialogContent style={{ overflow: "hidden" }} className={classes.root}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <DialogContentText>
                                        Cadre didactice
                                    </DialogContentText>

                                    <FormControl className={classes.formControl} >
                                        <InputLabel id="demo-controlled-open-select-label1">Cadre didactice</InputLabel>
                                        <Select
                                            open={this.state.openIdProf}
                                            onClose={this.handleCloseIdProf}
                                            onOpen={this.handleOpenIdProf}
                                            value={this.state.idProfesor}
                                            onChange={this.onHandleChangeIdProf}
                                            inputProps={{
                                                name: 'idProfesor',
                                                id: 'demo-controlled-open-select1'
                                            }}
                                        >
                                            {this.props.profesori.map((profs, index) =>
                                                <MenuItem key={profs.ProfesorID} value={profs.ProfesorID} >{profs.NumeProfesor} {profs.PrenumeProfesor}</MenuItem>

                                            )}

                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions className={classes.root}>
                            <Button onClick={this.handleClose} className={classes.submit}>
                                Cancel
                            </Button>
                            <Button onClick={() => {
                                this.state.chartData = {}
                                this.state.activitati = []
                                this.state.anArray = []
                                this.state.aniUnici = []
                                this.state.nrActivitatiPeAn = []
                                this.state.ani = []
                                this.state.numaractiv = []
                                this.state.graficDate = {}
                                this.state.graficPieDate = {}

                                this.state.numarActivitatiDupaTipAnCurent = []
                                this.state.tipActivitate = []
                                this.state.nrActivDupaTip = []
                                this.getAniSiNrActivitati();
                                this.getNrActivitatiDupaTip();
                                this.handleClose()
                                this.state.animation=true;
                                // this.state.displayTitle = true;
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

                    <Grafice
                        afiseazaGrafic={this.afiseazaGrafic}
                        graficDate={this.state.graficDate}
                        graficPieDate={this.state.graficPieDate}
                        afiseazaPieChart={this.afiseazaPieChart}
                        animation={this.state.animation}


                        afiseazaEvolutie={this.afiseazaEvolutie}
                        numarTotalActivitatiAnCurent={this.state.numarTotalActivitatiAnCurent}
                        onClickGrafic={this.state.onClickGrafic}
                        onClickEvolutie={this.state.onClickEvolutie}
                        onClickStatusActiv={this.state.onClickStatusActiv}

                    ></Grafice>
                </Container>

            </div >
        );
    }

}

export default withStyles(styles)(PopUpAlegeProfesor)
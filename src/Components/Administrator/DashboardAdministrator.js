import React, { Component } from 'react';
import MenuAdministrator from './MenuAdministrator';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PopUpAlegeProfesor from './PopUpAlegeProfesor';
import { adminiRoute, profesoriRoute, activitatiOrdonateDupaData } from '../../Routes/ApiRouter'
import { get, remove, getNrActivitatiPeAnDupaIdProf, getNrActivitatiPeAnDupaIdProfSiTipActivitate } from '../../Calls/Calls';
import Grafice from '../../Charts/Charts'

const drawerWidth = 240;
const colorAppBar = '#30475e'
const colorMain = '#ececec'


const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Chilanka',
            'cursive',
            // "Comic Neue", 'cursive',
        ].join(','),
        fontSize: 15
    },
});

const styles = theme => ({
    root: {
        display: 'flex',


    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: colorMain,

    },
   
})

class DashboardAdministrator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titlu: "Dashboard",
            profesori: [],
            idProfesor: 0,
            idAdmin: 0,

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

        }

        this.onHandleChangeIdProf = this.onHandleChangeIdProf.bind(this);

        this.afiseazaGrafic = this.afiseazaGrafic.bind(this);
        this.afiseazaEvolutie = this.afiseazaEvolutie.bind(this);
        this.afiseazaPieChart = this.afiseazaPieChart.bind(this);
        this.getNrActivitatiDupaTip = this.getNrActivitatiDupaTip.bind(this);
        this.getAniSiNrActivitati = this.getAniSiNrActivitati.bind(this);

        this.onChangeClickGrafic = this.onChangeClickGrafic.bind(this);
        this.onChangeEvolutie = this.onChangeClickNrActivTotale.bind(this);
        this.onChangeClickStatusActiv = this.onChangeClickStatusActiv.bind(this)
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

    async getAniSiNrActivitati() {
        let activitati = await get(activitatiOrdonateDupaData, this.state.idProfesor);
        this.setState({ activitati: activitati })
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
    }

    async getNrActivitatiDupaTip() {
        let dataCurenta = new Date();
        let anCurent = dataCurenta.getFullYear();

        let newNumarActivitatiDupaTipAnCurent = this.state.numarActivitatiDupaTipAnCurent;
        let activitatiAnCurentVerificate = await getNrActivitatiPeAnDupaIdProfSiTipActivitate(this.state.idProfesor, anCurent, "Verificat")
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


    async componentDidMount() {
        let id = this.props.match.params.id
        let data = await get(adminiRoute, id);
        if (data.hasErrors) {
            alert(data.message);
            return;
        }

        this.setState({ profesori: data.Profesori });
        this.setState({ idAdmin: id })

    }

    afiseazaGrafic() {
        // this.getAniSiNrActivitati();
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
        // this.getAniSiNrActivitati();
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
        // this.getNrActivitatiDupaTip()
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

    onHandleChangeIdProf(idProf) {
        this.setState({ idProfesor: idProf })
        console.log(this.state.idProfesor)
    }

    // componentWillUnmount(){
    //     this.getNrActivitatiDupaTip();
    //     this.getAniSiNrActivitati();
    // }

    render() {
        const { classes } = this.props
        let id = this.props.match.params.id;
        let idProf = this.state.idProfesor
        console.log(idProf)
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <MenuAdministrator
                        titlu={this.state.titlu}
                        idAdmin={id}
                        onPushAfisare={() => { this.props.history.push(`/Home/Administrator/${id}/AfisareProfesori`) }}
                        onPushActivitati={() => { this.props.history.push(`/Home/Administrator/${id}/AfisareActivitati`) }}
                        onPushLogin={() => { this.props.history.push(`/Login`) }}
                        onPushProfil={() => { this.props.history.push(`/Home/Administrator/${id}/Profil`) }}
                    />

                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
         
                        <PopUpAlegeProfesor
                            profesori={this.state.profesori}
                            onHandleChangeIdProf={this.onHandleChangeIdProf}
                            id={this.state.idAdmin}
                        />
                    </main>
                </div>
            </ThemeProvider>

        )
    }
}

export default withStyles(styles)(DashboardAdministrator);
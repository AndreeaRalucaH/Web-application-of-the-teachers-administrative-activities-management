import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MenuProfesori from './MenuProfesori';
import FloatingActionButton from './FloatingActionButton';
import { get, getNrActivitatiPeAnDupaIdProf, getNrActivitatiPeAnDupaIdProfSiTipActivitate } from '../../Calls/Calls';
import { activitateProfRoute, activitatiOrdonateDupaData } from '../../Routes/ApiRouter';
import Grafice from '../../Charts/Charts'
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const drawerWidth = 240;
const colorAppBar = '#30475e'
const colorMain = '#ececec'


const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Chilanka',
            'cursive',
        ].join(','),
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
        backgroundColor: colorMain
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
})

class DashboardProfesor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titlu: "Dashboard",
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
        let id = this.props.match.params.id;
        let activitati = await get(activitatiOrdonateDupaData, id);
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
            let numar = await getNrActivitatiPeAnDupaIdProf(id, an)
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
        let id = this.props.match.params.id;
        let dataCurenta = new Date();
        let anCurent = dataCurenta.getFullYear();

        let newNumarActivitatiDupaTipAnCurent = this.state.numarActivitatiDupaTipAnCurent;
        let activitatiAnCurentVerificate = await getNrActivitatiPeAnDupaIdProfSiTipActivitate(id, anCurent, "Verificat")
        newNumarActivitatiDupaTipAnCurent.push({ tip: "Verificate", numar: activitatiAnCurentVerificate })

        let activitatiAnCurentNeverificate = await getNrActivitatiPeAnDupaIdProfSiTipActivitate(id, anCurent, "Neverificat")
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

    componentDidMount() {
        this.getAniSiNrActivitati();
        this.getNrActivitatiDupaTip()
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
        const { classes } = this.props
        let id = this.props.match.params.id;
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <MenuProfesori
                        titlu={this.state.titlu}
                        idProf={id}
                        onPushAfisare={() => { this.props.history.push(`/Home/Profesor/${id}/Activitati`) }}
                        onPushLogin={() => { this.props.history.push(`/Login`) }}
                        onPushAfiseazaNotite={() => { this.props.history.push(`/Home/Profesor/${id}/AfiseazaNotita`) }}
                        onPushActivitatiCadreDidactice={() => { this.props.history.push(`/Home/Profesor/${id}/ActivitatiCadreDidactice`) }}
                        onPushProfil={() => {this.props.history.push(`/Home/Profesor/${id}/Profil`)}}
                    />

                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        {/* <Grid container spacing={3} > */}
                        {/* <Grid item xs={12}> */}
                        <Grafice
                            afiseazaGrafic={this.afiseazaGrafic}
                            graficDate={this.state.graficDate}
                            graficPieDate={this.state.graficPieDate}
                            afiseazaPieChart={this.afiseazaPieChart}

                            afiseazaEvolutie={this.afiseazaEvolutie}
                            numarTotalActivitatiAnCurent={this.state.numarTotalActivitatiAnCurent}
                            onClickGrafic={this.state.onClickGrafic}
                            onClickEvolutie={this.state.onClickEvolutie}
                            onClickStatusActiv={this.state.onClickStatusActiv}

                        ></Grafice>
                        {/* </Grid> */}

                        {/* </Grid> */}

                        {/* <button onClick={() => { this.getDateGrafic() }}></button> */}


                    </main>

                </div>
            </ThemeProvider >
        )
    }
}

export default withStyles(styles)(DashboardProfesor)
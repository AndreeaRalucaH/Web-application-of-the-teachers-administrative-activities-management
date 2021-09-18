import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { activitatiRoute, profesoriRoute, profesorAnRoute } from '../../Routes/ApiRouter'
import { remove, getActivitateDupaAn,getAtasamenteDupaIdActivitate } from '../../Calls/Calls';

import MenuProfesori from "./MenuProfesori"
import CardsProfesori from "./CardsProfesori"
import FloatingActionButton from './FloatingActionButton'
import PopUpFiltreazaActivitatiProfesori from './PopUpFiltreazaActivitatiProfesori'


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
    
})

class AfisareActivitati extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activitati: [],
            idActivitate: 0,
            idAtasament: 0,
            contor: false,
            titlu: "Activitati"
        }

        this.deleteActivitate = this.deleteActivitate.bind(this);
        this.onChangeActivitati = this.onChangeActivitati.bind(this);
        this.onChangeIdActivitate = this.onChangeIdActivitate.bind(this);
        this.onChangeTitluFormularSiButon = this.onChangeTitluFormularSiButon.bind(this);
        this.onChangeIdAtasament = this.onChangeIdAtasament.bind(this);
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        let an = new Date();
        let anCurent = an.getFullYear();
        console.log(anCurent)
        let data = await getActivitateDupaAn(id, anCurent); //afiseaza activitatile din anul curent
        // let data = await get(profesoriRoute, id);
        console.log(data)
        // let atasamente = await getAtasamenteDupaIdActivitate(data[0].Activitati.ActivitateID)
        // console.log(atasamente)
        if (data.hasErrors) {
            alert(data.message);
            return;
        }
        if (data === undefined || data.length === 0) {
            this.props.history.push(`/Home/Profesor/${id}/AdaugaActivitate`)
        } else {
            this.setState({ activitati: data })

        }

    }

    async deleteActivitate(id, index) {
        let res = await remove(activitatiRoute, id);

        if (res.hasErrors) {
            alert(res.message);
            return;
        }

        let activs = this.state.activitati;
        activs.splice(index, 1);
        this.setState({ activitati: activs });
    }

    onChangeActivitati(value) {
        this.setState({ activitati: value })
    }

    onChangeIdActivitate(value) {
        this.state.idActivitate = value;
    }

    onChangeIdAtasament(value){
        this.state.idAtasament = value;
    }

    onChangeTitluFormularSiButon(titluFormular, denumireButon) {
        this.state.titluFormular = titluFormular;
        this.state.denumireButon = denumireButon;
    }

    render() {
        const { classes } = this.props;
        let id = this.props.match.params.id;
        // console.log(this.state.activitati)
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <MenuProfesori
                        titlu={this.state.titlu}
                        idProf={id}
                        onPushAfisare={() => { this.props.history.push(`/Home/Profesor/${id}/Activitati`) }}
                        onPushDashboard={() => { this.props.history.push(`/Home/Profesor/${id}`) }}
                        onPushLogin={() => { this.props.history.push(`/Login`) }}
                        onPushAfiseazaNotite={() => { this.props.history.push(`/Home/Profesor/${id}/AfiseazaNotita`) }}
                        onPushProfil={() => {this.props.history.push(`/Home/Profesor/${id}/Profil`)}}
                        onPushActivitatiCadreDidactice={() => { this.props.history.push(`/Home/Profesor/${id}/ActivitatiCadreDidactice`) }}
                    />

                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />

                        <Grid item xs={12}>
                            <PopUpFiltreazaActivitatiProfesori
                                idProf={id}
                                onChangeActivitati={this.onChangeActivitati}
                                />
                        </Grid>

                        <CardsProfesori
                            activitati={this.state.activitati}
                            onDelete={this.deleteActivitate}
                            onChangeIdActivitate={this.onChangeIdActivitate}
                            onChangeIdAtasament={this.onChangeIdAtasament}
                            onPushEditare={() => { this.props.history.push(`/Home/Profesor/${id}/AdaugaActivitate/${this.state.idActivitate}/${this.state.idAtasament}`) }}
                        />


                        <FloatingActionButton onPushAdauga={() => { this.props.history.push(`/Home/Profesor/${id}/AdaugaActivitate`) }} />
                    </main>
                </div>
            </ThemeProvider>

        )
    }
}

export default withStyles(styles)(AfisareActivitati);
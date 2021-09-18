import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MenuProfesori from './MenuProfesori';
import NotiteFloatingActionButton from './NotiteFloatingActionButton';
import { get, remove } from '../../Calls/Calls';
import { notitaRoute, profesoriRoute, profesorAnRoute } from '../../Routes/ApiRouter';
import CardsNotite from './CardsNotite';
import FiltreazaActivitatiCadreDidactice from './FiltreazaActivitatiCadreDidactice';

// import './Style/StickyNotes.css';

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

class AfisareActivitatiCadreDidactice extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titlu: "Activitati cadre didactice",
            profesori: [],
            idNotita: 0,
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        let profesori = await get(profesorAnRoute, id);
        console.log(profesori)
        this.setState({profesori: profesori})
    }

    render() {
        const { classes } = this.props;
        let id = this.props.match.params.id;
        console.log(this.state.profesori)
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <MenuProfesori
                        titlu={this.state.titlu}
                        idProf={id}
                        onPushDashboard={() => { this.props.history.push(`/Home/Profesor/${id}`) }}
                        onPushAfisare={() => { this.props.history.push(`/Home/Profesor/${id}/Activitati`) }}
                        onPushLogin={() => { this.props.history.push(`/Login`) }}
                        onPushAfiseazaNotite={() => { this.props.history.push(`/Home/Profesor/${id}/AfiseazaNotita`) }}
                        onPushProfil={() => {this.props.history.push(`/Home/Profesor/${id}/Profil`)}}
                    />

                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        {/* <FormAdaugaActivitate
                            onPushActivitati={() => { this.props.history.push(`/Home/Profesor/${id}/Activitati`) }}
                            idProf={id}
                            idActivitate={idActivitate}
                        />
                        <FloatingActionButton /> */}
                        <FiltreazaActivitatiCadreDidactice profesori={this.state.profesori} />

                        {/* <CardsNotite
                            idProf={id}
                            notite={this.state.notite}
                            stergeNotite={this.deleteNotita}
                            onChangeIdNotita={this.onChangeIdNotita}
                            onPushEditare={() => { this.props.history.push(`/Home/Profesor/${id}/AdaugaNotita/${this.state.idNotita}`) }}
                        ></CardsNotite> */}


                    </main>

                </div>
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(AfisareActivitatiCadreDidactice);


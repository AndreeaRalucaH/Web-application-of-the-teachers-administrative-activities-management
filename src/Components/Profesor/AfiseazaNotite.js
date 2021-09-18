import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MenuProfesori from './MenuProfesori';
import NotiteFloatingActionButton from './NotiteFloatingActionButton';
import { get, remove } from '../../Calls/Calls';
import { notitaRoute, profesoriRoute, notitaProfRoute } from '../../Routes/ApiRouter';
import CardsNotite from './CardsNotite';

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

class AfiseazaNotita extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titlu: "Afisare notita",
            notite: [],
            idNotita: 0,
        }

        this.deleteNotita = this.deleteNotita.bind(this);
        this.onChangeIdNotita = this.onChangeIdNotita.bind(this);
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        let notite = await get(notitaProfRoute, id);
        console.log(notite)
        
        if (notite === undefined || notite.length === 0) {
            this.props.history.push(`/Home/Profesor/${id}/AdaugaNotita`)
        } else {
            this.setState({ notite: notite})

        }
    }

    async deleteNotita(id, index) {
        let notitaStearsa = await remove(notitaRoute, id);

        if (notitaStearsa.hasErrors) {
            alert(notitaStearsa.message);
            return;
        }

        let notiteNoi = this.state.notite;
        notiteNoi.splice(index, 1);
        this.setState({ notite: notiteNoi })
    }

    onChangeIdNotita(value) {
        this.state.idNotita = value;
    }

    render() {
        const { classes } = this.props;
        let id = this.props.match.params.id;
        console.log(this.state.notite)
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <MenuProfesori
                        titlu={this.state.titlu}
                        idProf={id}
                        onPushDashboard={() => { this.props.history.push(`/Home/Profesor/${id}`) }}
                        onPushAfisare={() => { this.props.history.push(`/Home/Profesor/${id}/Activitati`) }}
                        onPushLogin={() => { this.props.history.push(`/Login`) }}
                        onPushProfil={() => {this.props.history.push(`/Home/Profesor/${id}/Profil`)}}
                        onPushActivitatiCadreDidactice={() => { this.props.history.push(`/Home/Profesor/${id}/ActivitatiCadreDidactice`) }}
                    />

                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        {/* <FormAdaugaActivitate
                            onPushActivitati={() => { this.props.history.push(`/Home/Profesor/${id}/Activitati`) }}
                            idProf={id}
                            idActivitate={idActivitate}
                        />
                        <FloatingActionButton /> */}

                        <CardsNotite
                            idProf={id}
                            notite={this.state.notite}
                            stergeNotite={this.deleteNotita}
                            onChangeIdNotita={this.onChangeIdNotita}
                            onPushEditare={() => { this.props.history.push(`/Home/Profesor/${id}/AdaugaNotita/${this.state.idNotita}`) }}
                        ></CardsNotite>

                        <NotiteFloatingActionButton onPushAdaugaNotite={() => { this.props.history.push(`/Home/Profesor/${id}/AdaugaNotita`) }}></NotiteFloatingActionButton>
                    </main>

                </div>
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(AfiseazaNotita);


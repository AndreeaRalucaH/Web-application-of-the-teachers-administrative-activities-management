import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MenuProfesori from './MenuProfesori';
import FloatingActionButton from './FloatingActionButton';
import FormAdaugaActivitate from './FormAdaugaActivitate'

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

class AdaugaActivitate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titlu: "Adaugare activitate"
        }
    }

    render() {
        const { classes } = this.props;
        let id = this.props.match.params.id;
        let idActivitate = this.props.match.params.idActivitate;
        let idAtasament = this.props.match.params.idAtasament;
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
                        onPushAfiseazaNotite={() => { this.props.history.push(`/Home/Profesor/${id}/AfiseazaNotita`) }}
                        onPushActivitatiCadreDidactice={() => { this.props.history.push(`/Home/Profesor/${id}/ActivitatiCadreDidactice`) }}
                    />

                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <FormAdaugaActivitate
                            onPushActivitati={() => { this.props.history.push(`/Home/Profesor/${id}/Activitati`) }}
                            idProf={id}
                            idActivitate={idActivitate}
                            idAtasament={idAtasament}
                        />
                        <FloatingActionButton />
                    </main>

                </div>
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(AdaugaActivitate);


import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MenuProfesori from './MenuProfesori';
import FormVizualizeazaProfil from './FormVizualizeazaProfil';

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

class ProfilProf extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titlu: "Profil"
        }
    }

    render() {
        const { classes } = this.props;
        let id = this.props.match.params.id;

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
                        onPushActivitatiCadreDidactice={() => { this.props.history.push(`/Home/Profesor/${id}/ActivitatiCadreDidactice`) }}
                        onPushProfil={() => {this.props.history.push(`/Home/Profesor/${id}/Profil`)}}
                    />

                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <FormVizualizeazaProfil
                            idProfesor={id}
                            onPushDashboard={() => { this.props.history.push(`/Home/Profesor/${id}`) }}
                            onPushLogin={() => { this.props.history.push(`/Login`) }}
                        />
                    </main>

                </div>
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(ProfilProf);


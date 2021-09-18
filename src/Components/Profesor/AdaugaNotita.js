import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MenuProfesori from './MenuProfesori';
import NotiteFloatingActionButton from './NotiteFloatingActionButton';
import FormAdaugaNotita from './FormAdaugaNotita';

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

class AdaugaNotita extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titlu: "Adaugare notita"
        }
    }

    render() {
        const { classes } = this.props;
        let id = this.props.match.params.id;
        let idNotita = this.props.match.params.idNotita;
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

                        <FormAdaugaNotita
                            onPushNotite={() => { this.props.history.push(`/Home/Profesor/${id}/AfiseazaNotita`) }}
                            idProf={id}
                            idNotita={idNotita} >

                        </FormAdaugaNotita>
                        <NotiteFloatingActionButton />
                    </main>

                </div>
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(AdaugaNotita);


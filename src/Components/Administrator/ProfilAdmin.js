import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MenuAdministrator from './MenuAdministrator';
import FormVizualizeazaProfilAdmin from './FormVizualizeazaProfilAdmin';

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
                    <MenuAdministrator
                        titlu={this.state.titlu}
                        idAdmin={id}
                        onPushDashb={() => { this.props.history.push(`/Home/Administrator/${id}`) }}
                        onPushAfisare={() => { this.props.history.push(`/Home/Administrator/${id}/AfisareProfesori`) }}
                        onPushLogin={() => { this.props.history.push(`/Login`) }}
                        onPushActivitati={() => { this.props.history.push(`/Home/Administrator/${id}/AfisareActivitati`) }}
                        onPushProfil={() => { this.props.history.push(`/Home/Administrator/${id}/Profil`) }}
                    />

                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <FormVizualizeazaProfilAdmin
                            idAdmin={id}
                            onPushDashb={() => { this.props.history.push(`/Home/Administrator/${id}`) }}
                            onPushLogin={() => { this.props.history.push(`/Login`) }}
                        />
                    </main>

                </div>
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(ProfilProf);


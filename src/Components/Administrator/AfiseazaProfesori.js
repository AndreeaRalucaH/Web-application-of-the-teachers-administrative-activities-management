import React, { Component } from 'react';

import MenuAdministrator from './MenuAdministrator';
import CardsProfesori from './CardsProfesori';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { adminiRoute,profesoriRoute } from '../../Routes/ApiRouter'
import { get, getNrProfesoriDupaIdAdmin, remove } from '../../Calls/Calls';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const colorAppBar = '#30475e'
const colorMain = '#ececec'

// " Dekko", 'cursive'
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


class AfiseazaProfesori extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profesori: [],
            titlu: "Cadre didactice",
            nrProfesori: 0,
        }

        this.deleteProfesori = this.deleteProfesori.bind(this);
    }

    async componentDidMount() {
        let id = this.props.match.params.id
        let data = await get(adminiRoute, id);
        let nrProfesori = await getNrProfesoriDupaIdAdmin(id);
        // console.log(nrProfesori)
        if (data.hasErrors) {
            alert(data.message);
            return;
        }

        this.setState({nrProfesori: nrProfesori})
        this.setState({ profesori: data.Profesori });
    }

    async deleteProfesori(id, index){
        let idAdmin = this.props.match.params.id
        let profesorSters = await remove(profesoriRoute, id);
        
        if(profesorSters.hasErrors){
            alert(profesorSters.message);
            return;
        }

        let profesoriNew = this.state.profesori;
        profesoriNew.splice(index,1);
        this.setState({profesori: profesoriNew });
        let nrProfesori = await getNrProfesoriDupaIdAdmin(idAdmin);
        this.setState({nrProfesori: nrProfesori})
    }





    render() {
        let id = this.props.match.params.id;
        const { classes } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <MenuAdministrator
                        titlu = {this.state.titlu}
                        idAdmin={id}
                        onPushDashb={() => { this.props.history.push(`/Home/Administrator/${id}`) }}
                        onPushAfisare={() => { this.props.history.push(`/Home/Administrator/${id}/AfisareProfesori`) }}
                        onPushActivitati={() => { this.props.history.push(`/Home/Administrator/${id}/AfisareActivitati`) }}
                        onPushLogin={() => { this.props.history.push(`/Login`) }}
                        onPushProfil={() => {this.props.history.push(`/Home/Administrator/${id}/Profil`)}}
                    />

                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <CardsProfesori profesori={this.state.profesori} onDeleteProfesor = {this.deleteProfesori} nrProfesori={this.state.nrProfesori}/>
                    </main>
                </div>
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(AfiseazaProfesori);

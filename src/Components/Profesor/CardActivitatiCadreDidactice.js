import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Trash, Pencil } from 'react-bootstrap-icons/build/index.js';
import Tooltip from '@material-ui/core/Tooltip';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import PopUpAfiseazaDetaliiActivitati from './PopUpAfiseazaDetaliiActivitati';
// import Documente from '../../../../../BackEnd/Documente/002fig01.png.jpg-1625073167323.jpeg'
import logo from "./boss.png"


import "../Profesor/Style/Cards.css";
import "../Profesor/Style/HoverText.css";
import DeleteDialog from './DeleteDialog';

const colorAppBar = '#30475e'
const colorIcons = "#61A0AF"

const styles = theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    rootCard: {
        borderRadius: '1rem',
        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
        // minWidth: 600,
        backgroundColor: ""
    },
    trashIcon: {
        float: 'right',
        color: colorIcons,
        fontSize: 22,
        height: 50,
    },
    pencilIcon: {
        float: 'right',
        color: colorIcons,
        fontSize: 22,
        height: 50,
        marginRight: theme.spacing(1)
    },
    chipGreen: {
        float: 'left',
        backgroundColor: "#45734A",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        color: "white"
    },
    chipRed: {
        float: 'left',
        backgroundColor: "#ED3131",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        color: "white"
    },

})

class CardsActivitatiCadreDidactice extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titluFormular: "Adauga o activitate",
            denumireButon: "Adauga",
            open: false,
            openDeleteDialog: false,
            dataInceput: null,
            dataFinal: null,
            denumireActivitate: '',
            statusActivitate: '',
            referintaAtasament: '',
            activitateId: 0
        }
        this.handleClickOpenDeleteDialog = this.handleClickOpenDeleteDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
    }

    handleClickOpenDeleteDialog() {
        this.setState({ openDeleteDialog: true })
    }

    handleClickCloseDeleteDialog() {
        this.setState({ openDeleteDialog: true })
    }

    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={4}>
                    {this.props.activitati.map((activ, index) => (
                        <Grid item xs={12} md={6} key={activ.ActivitateID}>
                            <Card className={classes.rootCard} >
                                <CardActionArea  >
                                    <CardContent  >
                                        <div onClick={() => {
                                            this.handleClickOpen()
                                            this.setState({ denumireActivitate: activ.DenumireActivitate })
                                            this.setState({ dataInceput: activ.DataInceput })
                                            this.setState({ dataFinal: activ.DataFinal })
                                            this.setState({ statusActivitate: activ.Profesori[0].GestiuneActivitati.VerificareActivitate })
                                            if (activ.Atasamente[0] === undefined) {
                                                this.setState({ referintaAtasament: '' })
                                            } else {
                                                this.setState({ referintaAtasament: activ.Atasamente[0].ReferintaAtasament })
                                            }
                                        }}>
                                            <Typography noWrap gutterBottom variant="h6" component="h2" >
                                                {activ.DenumireActivitate}
                                            </Typography>
                                            <Typography gutterBottom display="inline" variant="subtitle1" component="h2">
                                                {"Data inceperii: "} { } {activ.DataInceput}
                                            </Typography>
                                        </div>
                                        <Divider />
                                        <div>

                                        </div>
                                        <Chip label={activ.Profesori[0].GestiuneActivitati.VerificareActivitate}  className={activ.Profesori[0].GestiuneActivitati.VerificareActivitate === "Verificat" ? classes.chipGreen : classes.chipRed} />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <PopUpAfiseazaDetaliiActivitati
                    open={this.state.open}
                    onClose={this.handleClose}
                    denumireActivitate={this.state.denumireActivitate}
                    dataInceput={this.state.dataInceput}
                    dataFinal={this.state.dataFinal}
                    statusActivitate={this.state.statusActivitate}
                    referintaAtasament={this.state.referintaAtasament}
                    activitateId={this.state.activitateId}
                />
            </Container>
        )
    }
}

export default withStyles(styles)(CardsActivitatiCadreDidactice);
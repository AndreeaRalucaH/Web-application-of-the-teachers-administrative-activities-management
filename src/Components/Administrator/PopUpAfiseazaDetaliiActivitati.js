import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

import { gestiuneRoute, activitatiRoute } from '../../Routes/ApiRouter.js'
import { put, get } from '../../Calls/Calls.js'
import eventBus from '../EventBus/EventBus.js';
import { FilePdf } from 'react-bootstrap-icons/build';
import { Divider } from '@material-ui/core';

const styles = theme => ({
    dialogTextActivitate: {
        color: "#222831",
        fontSize: 20,
    },
    dialogText: {
        color: "#222831",
        fontSize: 15
    },
    root: {
        backgroundColor: "#FBFBFF"
        
    },
    submit: {
        backgroundColor: "#61A0AF",
        color: "white",

    },
    pdfIcon: {
        color: "#ED3131",
        fontSize: 28,
        width: 35
    },
    cardTitle: {
        '& .MuiCardHeader-title': {
            textAlign: "left"
        },
        backgroundColor: "#61A0AF",
        color: "white"
    },

});

class PopUpAfiseazaDetaliiActivitati extends Component {
    constructor(props) {
        super(props)

        this.state = {
            GestiuneActivitati: {
                VerificareActivitate: ""
            },
            denumireButon: "Verificat"
        }

    }

    async verificaActivitate() {
        this.state.GestiuneActivitati.VerificareActivitate = this.state.denumireButon;
        let updateGestiune = await put(gestiuneRoute, this.props.idActivitate, this.state.GestiuneActivitati)
        if (updateGestiune.hasErrors) {
            alert(updateGestiune.message);
            return;
        }
        this.props.afiseazaActivitati();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle className={classes.root} id="form-dialog-title">Activitati</DialogTitle>
                    <Divider/>
                    <DialogContent className={classes.root}  >
                        <DialogContentText className={classes.dialogTextActivitate} >
                            {this.props.denumireActivitate}
                        </DialogContentText>
                        <DialogContentText className={classes.dialogText}>
                            Data inceput: { }
                            {this.props.dataInceput} { }
                        </DialogContentText>
                        <DialogContentText className={classes.dialogText} >
                            Data final: { }
                            {this.props.dataFinal} { }
                        </DialogContentText>
                        <DialogContentText className={classes.dialogText}>
                            Status: { }
                            {this.props.statusActivitate}
                        </DialogContentText>
                        <DialogContentText className={classes.dialogText} >
                            {/* <img src={logoPDF} width="30" height="30" ></img> */}

                            {this.props.referintaAtasament === '' ? "Fara document " : <FilePdf className={classes.pdfIcon}></FilePdf> }
                            <a href={this.props.referintaAtasament === "" ? " "
                                : `http://localhost:8080/Documente/${this.props.referintaAtasament}`}
                                target='_blank' rel='noopener noreferrer'
                            > {this.props.referintaAtasament}</a>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.root}>
                        <Button onClick={this.props.onClose} className={classes.submit}>
                            Cancel
                        </Button>
                        <Button className={classes.submit} onClick={() => {
                            this.verificaActivitate();
                            this.props.onClose();


                        }}>
                            {this.props.statusActivitate === "Verificat" ? this.state.denumireButon = "Neverificat" : this.state.denumireButon = "Verificat"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PopUpAfiseazaDetaliiActivitati);

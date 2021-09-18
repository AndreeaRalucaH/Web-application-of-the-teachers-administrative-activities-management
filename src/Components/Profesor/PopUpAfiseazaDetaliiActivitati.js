import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { getAtasamenteDupaIdActivitate } from '../../Calls/Calls';
import { FilePdf } from 'react-bootstrap-icons/build';



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

});

class PopUpAfiseazaDetaliiActivitati extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                // className={classes.root}
                >
                    <DialogTitle id="form-dialog-title" className={classes.root} >Activitati</DialogTitle>
                    <Divider />
                    <DialogContent className={classes.root} >

                        {/* <img src={this.state.referintaAtasament[0] === undefined ? " " : `http://localhost:8080/Documente/${this.state.referintaAtasament[0].ReferintaAtasament}`} alt='img'></img> */}
                        <DialogContentText className={classes.dialogTextActivitate} >
                            {this.props.denumireActivitate}
                        </DialogContentText>
                        {/* <Grid container spacing={3}> */}
                        {/* <Grid item xs={12} sm={6}> */}
                        <DialogContentText className={classes.dialogText}>
                            Data inceput: { }
                            {this.props.dataInceput} { }
                        </DialogContentText>
                        {/* </Grid> */}
                        {/* <Grid item xs={12} sm={6}> */}
                        <DialogContentText className={classes.dialogText} >
                            Data final: { }
                            {this.props.dataFinal} { }
                        </DialogContentText>
                        {/* </Grid> */}
                        {/* </Grid> */}
                        <DialogContentText className={classes.dialogText} >
                            Status: { }
                            {this.props.statusActivitate}
                        </DialogContentText>
                        <DialogContentText className={classes.dialogText}>
                            {this.props.referintaAtasament === '' ? "Fara document " : <FilePdf className={classes.pdfIcon}></FilePdf> }
                            <a href={this.props.referintaAtasament === '' ? " "
                                : `http://localhost:8080/Documente/${this.props.referintaAtasament}`}
                                target='_blank' rel='noopener noreferrer'
                            > {this.props.referintaAtasament}</a>
                       </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.root}>
                        <Button onClick={this.props.onClose} className={classes.submit}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PopUpAfiseazaDetaliiActivitati);

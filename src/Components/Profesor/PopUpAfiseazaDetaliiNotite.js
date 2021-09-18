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

class PopUpAfiseazaDetaliiNotite extends Component {
    constructor(props) {
        super(props)

        this.state = {
            referintaAtasament: []
        }
        this.getAtasamente = this.getAtasamente.bind(this)

    }

    // async componentDidMount() {
    //     let atasament = await getAtasamenteDupaIdActivitate(this.props.activitateId)
    //     this.setState({referintaAtasament: atasament.ReferintaAtasament})
    // }

    async getAtasamente() {
        const atasament = await getAtasamenteDupaIdActivitate(this.props.activitateId);

        this.setState({ referintaAtasament: atasament })
        // console.log(this.state.referintaAtasament[0].ReferintaAtasament)
    }

    // async componentDidMount() {
    //     await this.getAtasamente();
    // }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title" className={classes.root} >Notite</DialogTitle>
                    <Divider />
                    <DialogContent className={classes.root} >
                        <DialogContentText className={classes.dialogTextActivitate} >
                            {this.props.textNotita}
                        </DialogContentText>
                        <DialogContentText className={classes.dialogText}>
                            Data : { }
                            {this.props.dataNotita} { }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.root}>
                        <Button onClick={this.props.onClose} className={classes.submit}>
                            Cancel
                        </Button>
                        {/* <Button onClick={() => { this.getAtasamente() }} color="primary">
                            Verificat
                        </Button> */}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PopUpAfiseazaDetaliiNotite);

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

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
});


class DeleteDialog extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Stergere</DialogTitle>
                    <DialogContent  >
                        <DialogContentText className={classes.dialogTextActivitateext} >
                            Sigur doriti sa stergeti aceasta activitate?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} className={classes.submit}>
                            Da
                        </Button>
                        <Button onClick={this.props.onClose} className={classes.submit}>
                            Nu
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(DeleteDialog);

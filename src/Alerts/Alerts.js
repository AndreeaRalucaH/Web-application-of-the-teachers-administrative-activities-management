import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
});

class AlertDialogs extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Snackbar open={this.props.openAlert} anchorOrigin={{vertical: 'top', horizontal: 'right'}} autoHideDuration={1000} onClose={this.props.onClose}>
                    <Alert severity={this.props.tipAlerta} onClose={this.props.onClose}>
                        <AlertTitle>{this.props.titluAlerta}</AlertTitle>
                        {this.props.textAlerta}
                    </Alert>
                </Snackbar>

            </div>
        )
    }
}

export default withStyles(styles)(AlertDialogs)
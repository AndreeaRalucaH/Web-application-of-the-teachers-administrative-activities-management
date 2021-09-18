import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';


const colorIcons = "#61A0AF"
const colorMain = '#ececec'

const styles = theme => ({
    addIcon: {
        position: "absolute",
        right: '50px',
        bottom: '35px',
        height: "55",
        textAlign: "right",
        backgroundColor: colorIcons,
        color: colorMain

    },
})

class NotiteFloatingActionButton extends Component {

    render() {
        const { classes } = this.props
        return (
            <div >
                <Tooltip title="Adauga o noua notita" aria-label="add" >
                    <Fab className={classes.addIcon} onClick={this.props.onPushAdaugaNotite}> {/*Adauga onClick to adauga activitate */}
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </div>
        )
    }
}

export default withStyles(styles)(NotiteFloatingActionButton)
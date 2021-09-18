import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const colorAppBar = '#61A0AF'

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
        },

    },
    input: {
        display: 'none',

    },
    button: {
        backgroundColor: colorAppBar,
        color: "white"
    },
    iconButton: {
        color: colorAppBar,
    }
});

class UploadFile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fisier: '',

        }

        this.atasare = this.atasare.bind(this);
        // this.atasareFisier = this.atasareFisier.bind(this)
        // this.onChangeFisier = this.onChangeFisier.bind(this)
    }

    // onChangeFisier(e){


    atasare(e) {
        this.setState({ fisier: e.target.files[0] })
        let infoArea = document.getElementById('file-name')
        infoArea.textContent = e.target.files[0].name
    }



    render() {
        const { classes } = this.props;
        this.props.onChangeFiles(this.state.fisier)
        return (
            <div className={classes.root}>
                <form encType="multipart/form-data" >
                    <input
                        accept="application/pdf"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        name="fisier"
                        multiple={false}
                        onChange={(e) => {
                            this.atasare(e)
                        }}
                    />
                    <div id="file-name"></div>
                </form>

                <label htmlFor="contained-button-file">
                    <Button variant="contained" className={classes.button} component="span"  >
                        Upload
                    </Button>
                </label>
                {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton className={classes.iconButton} aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label> */}
                {/* <Button onClick={() => {this.atasareFisier()}}>Submit</Button> */}
            </div>
        );
    }

}

export default withStyles(styles)(UploadFile)
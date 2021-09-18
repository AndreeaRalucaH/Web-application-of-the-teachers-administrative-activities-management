import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { get } from '../../Calls/Calls';
import { adminiRoute } from '../../Routes/ApiRouter';

// let jsPDF = require('jspdf');
// require('jspdf-autotable');

const colorIcons = "#61A0AF"

const styles = theme => ({
    submit: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(2),
        backgroundColor: colorIcons,
        color: "white",
        fontSize: 13,
    },
})


class ExportaPDF extends Component {

    constructor() {
        super()

    }

    exportaPDF() {
        let document = new jsPDF('p', 'px', 'a3');
        document.setFont("times")
        document.setFontSize(18)
        let width = document.internal.pageSize.getWidth();
        document.text("Generare raport activitati", width / 2, 70, { align: 'center' });
        document.setFontSize(12)
        document.text("Profesor: " + this.props.profesori[0].GradProfesor + " Univ. " + " Dr. " + this.props.profesori[0].NumeProfesor + " " + this.props.profesori[0].PrenumeProfesor, 30, 100);

        let numarActivitati = 1;
        let activitati = [];
        this.props.activitati.forEach(element => {
            let activitate = [ //pentru varianta cu tabel simplu, imi cream un obiect aici { DenumireActivitate: element...}

                numarActivitati++,
                element.DenumireActivitate,
                element.DataInceput,
                element.DataFinal,
                element.Profesori[0].GestiuneActivitati.VerificareActivitate
            ];
            activitati.push(activitate)

        })
        let header = ["Nr. crt.", "Denumire activitate", "Data inceput", "Data final", "Status"];
        // let headerConfig = header.map(key => ({
        //     'name': key,
        //     'prompt': key,
        //     'width': 200,
        //     'height': 100,
        //     'align': 'center',
        //     'padding': 0
        // }));
        //TODO: cauta un cellConfig pentru a arata mai bine tabelul
        // document.table(10, 100, activitati, headerConfig)
        document.autoTable(header, activitati, {
            styles: { overflow: "linebreak", fontSize: 12, font: 'calibri', cellPadding: 4, textColor: [0, 0, 0], halign: 'left' },
            headStyles: {
                valign: 'middle',
                halign: 'center',
                // lineWidth: 1,
                // lineColor: [17, 22, 92]
                textColor: [0, 0, 0],
                fillColor: [169, 171, 199]
            },
            // theme: 'plain',
            startY: 120,
            // tableLineWidth: 1,
            // columnStyles: { 0: { tableLineColor: [0, 0, 0] } },

        })
        let tableHeight = document.autoTable.previous.finalY;

        let dataGenerare = new Date();
        let an = dataGenerare.getFullYear();
        let luna = dataGenerare.getMonth() + 1;
        let zi = dataGenerare.getDate();
        let dataGenerareNoua = zi + "." + luna + "." + an;

        document.text("Data generare: " + dataGenerareNoua, 30, tableHeight + 30)
        document.text("Generat de catre: " + this.props.administrator.GradulDidactic + " Univ. " + " Dr. " + this.props.administrator.AdminNume + " " + this.props.administrator.AdminPrenume, 380, tableHeight + 30)
        document.text("Semnatura: ", 500, tableHeight + 50)
        document.save(this.props.profesori[0].NumeProfesor + " " + this.props.profesori[0].PrenumeProfesor + ".pdf");
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button className={classes.submit} onClick={() => { this.exportaPDF() }}>Exporta PDF</Button>
            </div>
        )
    }
}

export default withStyles(styles)(ExportaPDF);
import db from '../configurareBD.js';
import Sequelize from 'sequelize';
import moment from 'moment';

const Activitati = db.define("Activitati",
    {
        ActivitateID:
        {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        DenumireActivitate:
        {
            type: Sequelize.STRING,
            allowNull: false
        },
        DataInceput:
        {
            type: Sequelize.DATEONLY,
            allowNull: false,
            validate:
            {
                isDate: true
            },
            //ADAUGA DATA IN ENGLEZA YYYY/MM/DD
            get() {
                return moment(this.getDataValue('DataInceput')).format('DD.MM.YYYY');  //formatare data
            }

        },
        DataFinal:
        {
            type: Sequelize.DATEONLY,
            allowNull: false,
            // get() {
            //     return moment(this.getDataValue('DataFinal')).format('YYYY-MM-DD');
            // },
            validate:
            {
                isDate: true
            },
            get() {
                return moment(this.getDataValue('DataFinal')).format('DD.MM.YYYY');  //formatare data, posibil sa-mi dea eroare moment-ul
            }
        },
        TipActivitate:
        {
            type: Sequelize.STRING,
        },
        // createdAt: {
        //     type: Sequelize.DATEONLY
        // }
    });

export default Activitati;
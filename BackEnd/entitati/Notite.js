import db from '../configurareBD.js';
import Sequelize from 'sequelize';
import moment from 'moment';

const Notite = db.define("Notite", 
{
    NotitaID:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    TextNotita:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    DataNotita:
    {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate:
        {
            isDate: true
        },
        get() {
            return moment(this.getDataValue('DataNotita')).format('DD.MM.YYYY');  //formatare data
        }

    },
    ProfesorID:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:
        {
            isInt: true
        }
    }, 
    createdAt: {
        type: Sequelize.DATEONLY
    }
});

export default Notite;
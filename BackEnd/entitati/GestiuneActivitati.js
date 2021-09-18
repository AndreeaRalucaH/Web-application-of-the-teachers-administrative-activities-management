import db from '../configurareBD.js';
import Sequelize from 'sequelize';

const GestiuneActivitati = db.define("GestiuneActivitati",
{
    ProfesorID:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:
        {
            isInt: true
        }
    },
    ActivitateID:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:
        {
            isInt: true
        }
    },
    VerificareActivitate:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate:
        {
            len: [1, 100]
        }
    },

});

export default GestiuneActivitati;
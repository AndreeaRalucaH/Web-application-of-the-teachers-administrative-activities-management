import db from '../configurareBD.js';
import Sequelize from 'sequelize';

const Atasamente = db.define("Atasamente",
{
    AtasamentID:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ReferintaAtasament:
    {
        type: Sequelize.STRING,
        allowNull: false,
        // validate:{
        //     len: [2, 100]
        // }
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
});

export default Atasamente;
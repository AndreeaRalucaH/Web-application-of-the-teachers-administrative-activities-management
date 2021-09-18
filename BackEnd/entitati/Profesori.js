import db from '../configurareBD.js';
import Sequelize from 'sequelize';

const Profesori = db.define("Profesori", 
{
    ProfesorID: 
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NumeProfesor:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate:
        {
            len: [2, 100]
        }
    },
    PrenumeProfesor:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate:
        {
            len: [2, 100]
        }
        
    },
    EmailProfesor:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate:
        {
            len: [2, 100],
            isEmail: true
        }
    },
    ParolaProfesor:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate:
        {
            len: [6, 100]
        }
    },
    GradProfesor:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate:
        {
            len: [2, 100]
        }
    },
    VechimeProfesor:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:
        {
            isInt: true
        }
    },
    TelefonProfesor:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [10, 100]
        }
    },
    AdministratorID:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:
        {
            isInt: true
        }
    },
    NumarActivitati:
    {
        type: Sequelize.INTEGER,
        validate:
        {
            isInt: true
        }
    }

});

export default Profesori;
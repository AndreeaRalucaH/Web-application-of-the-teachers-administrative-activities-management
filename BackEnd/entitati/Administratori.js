import db from '../configurareBD.js';
import Sequelize from 'sequelize';


const Administratori = db.define("Administratori", {

    AdministratorID: 
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    AdminNume:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 100] //definesc lungimea stringului
        }

    },
    AdminPrenume:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [2, 100]
        }
    },
    AdminEmail:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [1, 100],
            isEmail: true //trebuie sa aiba structura unui email: ceva@alteceva.com
        }
    },
    AdminParola:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [6, 100]
        }
    },
    AdminTelefon:
    {
        type: Sequelize.STRING,
        allowNull: true,
        validate:{
            len: [10, 100]
        }
    },
    GradulDidactic: 
    {
        type: Sequelize.STRING,
        allowNull: true,
        validate:
        {
            len: [2, 100]
        }
    },
    AdminLogin:{
        type: Sequelize.STRING,
        allowNull: true,
    }

});

export default Administratori;
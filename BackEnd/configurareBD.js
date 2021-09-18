import Sequelize from 'sequelize';

//conectarea la baza de date
const db = new Sequelize({
    dialect: 'mssql',
    dialectOptions: {
        "requestTimeout": 300000
    },
    database: 'ActivitatiDB',
    username: 'sa',
    host: 'localhost',
    port: '55892',
    password: '1234',
    validateBulkLoadParameters: true,
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

export default db;
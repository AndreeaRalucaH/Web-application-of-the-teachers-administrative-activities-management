import express from 'express';
import db from './configurareBD.js';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


import Activitati from './entitati/Activitati.js';
import Administratori from './entitati/Administratori.js';
import Atasamente from './entitati/Atasamente.js';
import GestiuneActivitati from './entitati/GestiuneActivitati.js';
import Notite from './entitati/Notite.js';
import Profesori from './entitati/Profesori.js';


let app = express();
let router = express.Router();
const Op = Sequelize.Op;
let andOp = Op.and;
// const __filename = fileURLToPath(import.meta.url)
const __dirname = path.resolve()


app.use(cors())
app.use("/Documente", express.static(path.join(__dirname, "Documente")));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

db.authenticate().then(() => { //autentificarea
    console.log("Connection has been estabilshed successfully.");
}).catch(err => {
    console.error("Unable to connect to the database: ", err);
})


//definim relatiile dintre tabele
//------------------relatie 1-M-----------------
//administratori - profesori
Administratori.hasMany(Profesori, { as: "Profesori", foreignKey: "AdministratorID" });
Profesori.belongsTo(Administratori, { foreignKey: "AdministratorID" });

//------------------relatie 1-M-----------------
//profesori - notite
Profesori.hasMany(Notite, { as: "Notite", foreignKey: "ProfesorID" });
Notite.belongsTo(Profesori, { foreignKey: "ProfesorID" });

//------------------relatie 1-M-----------------
//activitati - atasamente
Activitati.hasMany(Atasamente, { as: "Atasamente", foreignKey: "ActivitateID" });
Atasamente.belongsTo(Activitati, { foreignKey: "ActivitateID" });

//------------------relatie M-M-------------------
//profesori - activitati
Profesori.belongsToMany(Activitati, { through: "GestiuneActivitati", as: "Activitati", foreignKey: "ProfesorID" });
Activitati.belongsToMany(Profesori, { through: "GestiuneActivitati", as: "Profesori", foreignKey: "ActivitateID" });


//pune functia direct in post
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Documente');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        // let filePath = `Documente/${file.originalname}-${Date.now()}.${ext}`
        // Atasamente.create({ ReferintaAtasament: filePath,
        //     ActivitateID: 217 })
        //     .then(() => {
        //         cb(null, filePath); 
        //     })
        cb(null, `${file.originalname}`)
    }

});

const upload = multer({ storage: multerStorage });



//interogare tabele

//------------------------------------ADMINISTRATORI---------------------------------------
//----------------Inserare in tabela Administratori------------------
app.post('/admini', async (req, res, next) => {
    try {
        await Administratori.create(req.body, {
            include: [
                {
                    model: Profesori, as: "Profesori"
                }
            ]
        });
        res.status(201).json({ message: 'created' });
    } catch (err) {
        next(err);
    }
})

//----------------Select din tabela Administratori------------------
app.get('/admini', async (req, res, next) => {
    try {
        let admini = await Administratori.findAll({
            include: [ //imi face un join intre tabela Administratori si tabela Profesori
                {
                    model: Profesori, as: "Profesori",
                    include: [
                        {
                            model: Notite, as: "Notite" //join intre 3 tabele
                        }
                    ]
                }

            ]

        });
        res.status(200).json(admini);
    } catch (err) {
        next(err)
    }
})


//----------------Select din tabela Administratori dupa primary key-----------------
app.get('/admini/:id', async (req, res, next) => {
    try {
        let admin = await Administratori.findByPk(req.params.id, {
            include: [ //imi face un join intre tabela Administratori si tabela Profesori
                {
                    model: Profesori, as: "Profesori",
                    include: [
                        {
                            model: Notite, as: "Notite" //join intre 3 tabele
                        },
                        {
                            model: Activitati, as: "Activitati"
                        }
                    ]
                }

            ]
        });
        if (admin) {

            res.status(200).json(admin);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//-------------------Select din tabela Administratori dupa email----------------------------
app.get('/admin/:email', async (req, res, next) => {
    try {
        let emailAdmin = await Administratori.findAll({
            where:
            {
                AdminEmail: req.params.email
            }
        });
        if (emailAdmin) {

            res.status(200).json(emailAdmin);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//-------------------Select din tabela Administratori dupa nume----------------------------
app.get('/administrator/:nume', async (req, res, next) => {
    try {
        let numeAdmin = await Administratori.findAll({
            where:
            {
                AdminNume: req.params.nume
            },
            attributes: ["AdministratorID"]
        });
        if (numeAdmin) {
            // // if(req.header('Accept') == 'text/plain'){
            // //     res.status(200).send(numeAdmin.AdmnistratorID);
            // // }
            // res.setHeader("Content-Type", "text/plain")
            // res.status(200).send(numeAdmin);
            res.status(200).json(numeAdmin);

        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//---------------------------PROFESORI - NUMAR PROFESORI DUPA ID ADMIN----------------------------
app.get('/numarProfesori/:id', async (req, res, next) => {
    try {
        let numarProfesori = await Profesori.count({
            where: {
                AdministratorID: req.params.id,
            },
            
        })
        if (numarProfesori) {

            res.status(200).json(numarProfesori);
        }
        else {
            res.status(404).json(0)
        }
    } catch (err) {
        next(err)
    }
})

//----------------Delete din tabela Administratori -----------------
app.delete('/admini/:id', async (req, res, next) => {
    try {
        let admin = await Administratori.findByPk(req.params.id);
        if (admin) {
            await admin.destroy();
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//--------------------Update tabela Administratori---------------------
app.put('/admini/:id', async (req, res, next) => {
    try {
        let admin = await Administratori.findByPk(req.params.id);
        if (admin) {
            await admin.update(req.body);
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//--------------------Update tabela Administratori cu parametrul LogIn---------------------
app.put('/admin/:id', async (req, res, next) => {
    try {
        let admin = await Administratori.findByPk(req.params.id);
        if (admin) {
            await admin.update({ AdminLogin: req.body.AdminLogin });
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//-------------------Update tabela Profesori din Administratori--------------
app.put('/admini/:aid/profesori/:pid', async (req, res, next) => {
    try {
        let admin = await Administratori.findByPk(req.params.aid);
        if (admin) {
            let profi = await admin.getProfesori({
                where: {
                    ProfesorID: req.params.pid
                }
            });
            let prof = profi.shift();
            if (prof) {
                await prof.update(req.body, {
                    fields: ["NumeProfesor", "PrenumeProfesor"]
                })
                res.status(202).json({ message: "accepted" });
            } else {
                res.status(404).json({ message: 'not found' })
            }

        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//-----------------------------------------------------------------------------------------------------------------------


//--------------------------------------------PROFESORI-----------------------------------------------------------

//----------------Inserare in tabela Profesori------------------
app.post('/profesori', async (req, res, next) => {
    try {
        await Profesori.create(req.body, {
            include: [
                {
                    model: Notite, as: "Notite"
                }
            ]
        });
        res.status(201).json({ message: 'created' });
    } catch (err) {
        next(err);
    }
})


//----------------Select din tabela Profesori------------------
app.get('/profesori', async (req, res, next) => {
    try {
        let profesori = await Profesori.findAll({
            include: [ //imi face un join intre tabela Administratori si tabela Profesori
                {
                    model: Notite, as: "Notite"
                },
                {
                    model: Activitati, as: "Activitati",
                    through: {
                        attributes: ["VerificareActivitate"]
                    },
                    include: [
                        {
                            model: Atasamente, as: "Atasamente"
                        }

                    ]
                }
            ]
        });
        res.status(200).json(profesori);
    } catch (err) {
        next(err)
    }
})

//----------------Select din tabela Profesori dupa primary key-----------------
app.get('/profesori/:id', async (req, res, next) => {
    try {

        let prof = await Profesori.findByPk(req.params.id, {
            include: [ //imi face un join intre tabela Administratori si tabela Profesori
                {
                    model: Notite, as: "Notite"
                },
                {
                    model: Activitati, as: "Activitati",
                    through: {
                        attributes: ["VerificareActivitate"]
                    },
                    include: [{
                        model: Atasamente, as: "Atasamente"
                    }

                    ]
                }

            ],
            // order:[[Notite, "created_at", "DESC"]],
        });
        if (prof) {

            res.status(200).json(prof);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//----------------Select din tabela Profesori fara un anumit idProf------------------
app.get('/profesor/:id', async (req, res, next) => {
    try {
        let profesori = await Profesori.findAll({
            where: {
                ProfesorID: { [Op.ne]: req.params.id }
            },
            include: [ //imi face un join intre tabela Administratori si tabela Profesori
                {
                    model: Notite, as: "Notite"
                },
                {
                    model: Activitati, as: "Activitati",
                    through: {
                        attributes: ["VerificareActivitate"]
                    },
                    include: [
                        {
                            model: Atasamente, as: "Atasamente"
                        }

                    ]
                }
            ]
        });
        res.status(200).json(profesori);
    } catch (err) {
        next(err)
    }
})

//---------------------Select din tabela Profesori dupa id profesor si tip activitate-------------------------
app.get('/profesori/:pid/:tip', async (req, res, next) => {
    try {
        let profActiv = await Profesori.findAll({
            where: {
                ProfesorID: req.params.pid,
                '$Activitati.GestiuneActivitati.VerificareActivitate$': req.params.tip,
            },
            include: [ //imi face un join intre tabela Administratori si tabela Profesori
                {
                    model: Notite, as: "Notite"
                },
                {
                    model: Activitati, as: "Activitati",
                    through: {
                        attributes: ["VerificareActivitate"]
                    },
                    include: [{
                        model: Atasamente, as: "Atasamente"
                    }

                    ]
                }

            ]
        });
        if (profActiv) {

            res.status(200).json(profActiv);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//---------------------Select din tabela Profesori dupa id profesor si id activitate-------------------------
app.get('/profeso/:pid/:aid', async (req, res, next) => {
    try {
        let profActiv = await Profesori.findAll({
            where: {
                ProfesorID: req.params.pid,
                '$Activitati.ActivitateID$': req.params.aid,
            },
            include: [ //imi face un join intre tabela Administratori si tabela Profesori
                {
                    model: Notite, as: "Notite"
                },
                {
                    model: Activitati, as: "Activitati",
                    through: {
                        attributes: ["VerificareActivitate"]
                    },
                    include: [{
                        model: Atasamente, as: "Atasamente"
                    }

                    ]
                }

            ]
        });
        if (profActiv) {

            res.status(200).json(profActiv);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//---------------------Select din tabela Profesori dupa id profesor si id notita-------------------------
app.get('/profes/:pid/:aid', async (req, res, next) => {
    try {
        let profActiv = await Profesori.findAll({

            where: {
                ProfesorID: req.params.pid,
                '$Notite.NotitaID$': req.params.aid,
            },
            include: [ //imi face un join intre tabela Administratori si tabela Profesori
                {
                    model: Notite, as: "Notite"
                },
                {
                    model: Activitati, as: "Activitati",
                    through: {
                        attributes: ["VerificareActivitate"]
                    },
                    include: [{
                        model: Atasamente, as: "Atasamente"
                    }

                    ]
                }

            ]
        });
        if (profActiv) {

            res.status(200).json(profActiv);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//---------------------Select din tabela Profesori dupa id profesor si data inceput activitate-------------------------
app.get('/profesor/:cid/:an', async (req, res, next) => {
    try {
        // console.log(__dirname)
        let profActiv = await Profesori.findAll({

            where:
            {
                ProfesorID: req.params.cid,
                andOp: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Activitati.DataInceput')), req.params.an),

            },

            include: [ //imi face un join intre tabela Administratori si tabela Profesori
                {
                    model: Notite, as: "Notite"
                },
                {
                    model: Activitati, as: "Activitati",

                    through: {
                        attributes: ["VerificareActivitate"]
                    },

                    include: [{
                        model: Atasamente, as: "Atasamente"
                    }

                    ]
                }

            ],

        });
        if (profActiv) {

            res.status(200).json(profActiv);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//---------------------Select din tabela Profesori dupa id profesor, data inceput activitate si status activitate-------------------------
app.get('/profes/:pid/:an/:status', async (req, res, next) => {
    try {
        let profActiv = await Profesori.findAll({

            where:
            {
                [Op.and]: [
                    { ProfesorID: req.params.pid },
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Activitati.DataInceput')), req.params.an),
                    { '$Activitati.GestiuneActivitati.VerificareActivitate$': req.params.status }
                ]
            },

            include: [ //imi face un join intre tabela Administratori si tabela Profesori
                {
                    model: Notite, as: "Notite"
                },
                {
                    model: Activitati, as: "Activitati",

                    through: {
                        attributes: ["VerificareActivitate"]
                    },
                    include: [{
                        model: Atasamente, as: "Atasamente"
                    }

                    ],

                },

            ],
            // order: [[{ model: Activitati}, 'created_at', "DESC"]],

        });
        if (profActiv) {

            res.status(200).json(profActiv);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//-------------------Select din tabela Profesori dupa email----------------------------
app.get('/profEmail/:email', async (req, res, next) => {
    try {
        let emailProf = await Profesori.findAll({
            where:
            {
                EmailProfesor: req.params.email
            }
        });
        if (emailProf) {

            res.status(200).json(emailProf);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})



//----------------Delete din tabela Profesori -----------------
app.delete('/profesori/:id', async (req, res, next) => {
    try {
        let prof = await Profesori.findByPk(req.params.id);
        if (prof) {
            await prof.destroy();
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//------------------Update tabela Profesori-------------------
app.put('/profesori/:id', async (req, res, next) => {
    try {
        let prof = await Profesori.findByPk(req.params.id);
        if (prof) {
            await prof.update(req.body);
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//---------------Update Notite din tabela Profesori--------------
app.put('/profesori/:pid/notite/:tid', async (req, res, next) => {
    try {
        let prof = await Profesori.findByPk(req.params.pid);
        if (prof) {
            let notite = await prof.getNotite({
                where: {
                    NotitaID: req.params.tid
                }
            });
            let notita = notite.shift();
            if (notita) {
                await notita.update(req.body, {
                    fields: ["TextNotita", "DataNotita"]
                })
                res.status(202).json({ message: "accepted" });
            } else {
                res.status(404).json({ message: 'not found' })
            }

        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//---------------Update Activitati din tabela Profesori--------------
app.put('/profesori/:pid/activitati/:aid', async (req, res, next) => {
    try {
        let prof = await Profesori.findByPk(req.params.pid);
        if (prof) {
            let activitati = await prof.getActivitati({
                where: {
                    ActivitateID: req.params.aid
                }
            });
            let activitate = activitati.shift();
            if (activitate) {
                await activitate.update(req.body, {
                    fields: ["DenumireActivitate", "DataInceput", "DataFinal"]
                })
                res.status(202).json({ message: "accepted" });
            } else {
                res.status(404).json({ message: 'not found' })
            }

        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})



//---------------Update GestiuneActivitati din tabela Profesori--------------
// app.put('/profesor/:pid/gestiune/:gid', async (req, res, next) => {
//     try {
//         let prof = await Profesori.findByPk(req.params.pid);
//         if (prof) {
//             let activitati = await prof.getActivitati({
//                 where: {
//                     ActivitateID: req.params.aid
//                 }
//             });
//             if (activitati) {
//                 let gestiuneActivitati = await activitate.getGestiuneActivitati()
//                 let gestiune = gestiuneActivitati.shift();
//                 if (gestiune) {
//                     await gestiune.update(rez.body, {
//                         fields: ["VerificareActivitate"]
//                     })
//                     res.status(202).json({ message: "accepted" });
//                 } else {
//                     res.status(404).json({ message: 'not found' })
//                 }

//             } else {
//                 res.status(404).json({ message: 'not found' })
//             }

//         }
//         else {
//             res.status(404).json({ message: 'not found' })
//         }
//     } catch (err) {
//         next(err)
//     }
// })


app.post('/profesor/:pid/activitate', async (req, res, next) => {
    try {
        let profesori = await Profesori.findByPk(req.params.pid)
        if (profesori) {
            let activitate = req.body
            activitate.ActivitateID = profesori.id
            await Activitati.create(activitate)
            res.status(201).json({ message: 'created' })
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//-------------------------------------------------------------------------------------------------------------
//---------------------------------------------NOTITE----------------------------------------------------------

//------------------Insert in tabela Notite----------------------
app.post('/notite', async (req, res, next) => {
    try {
        await Notite.create(req.body);
        res.status(201).json({ message: 'created' });
    } catch (err) {
        next(err);
    }
})

//----------------Select din tabela Notite------------------
app.get('/notite', async (req, res, next) => {
    try {
        let notite = await Notite.findAll()
        res.status(200).json(notite);
    } catch (err) {
        next(err);
    }
})

//----------------Select din tabela Notite dupa Primary key------------------------
app.get('/notite/:id', async (req, res, next) => {
    try {
        let notita = await Notite.findByPk(req.params.id);
        if (notita) {

            res.status(200).json(notita);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//----------------Select din tabela Notite dupa ID PROFESOR------------------------
app.get('/notita/:pid', async (req, res, next) => {
    try {
        let notita = await Notite.findAll({
            where: {
                '$Profesori.ProfesorID$': req.params.pid,
            },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Profesori, as: "Profesori",
                }
            ]
        });
        if (notita) {

            res.status(200).json(notita);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//------------------Update tabela Notite-------------------
app.put('/notite/:id', async (req, res, next) => {
    try {
        let notita = await Notite.findByPk(req.params.id);
        if (notita) {
            await notita.update(req.body);
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//---------------Delete din tabela Notite-------------------------
app.delete('/notite/:id', async (req, res, next) => {
    try {
        let notita = await Notite.findByPk(req.params.id);
        if (notita) {
            await notita.destroy();
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//--------------------------------------------ATASAMENTE----------------------------------------

//------------------------------------Select atasamente ------------------------
app.get('/atasament', async (req, res, next) => {
    try {
        let atasament = await Atasamente.findAll({
            include: [
                {
                    model: Activitati, as: "Activitati"
                },
            ]

        });
        res.status(200).json(atasament);
    } catch (err) {
        next(err)
    }
})

//------------------------------------Select atasamente dupa id Activitate------------------------
app.get('/atasamente/:aid', async (req, res, next) => {
    try {
        let atasament = await Atasamente.findAll({
            // attributes: ["ReferintaAtasament"],
            where: {
                ActivitateID: req.params.aid
            }
        });
        if (atasament) {
            res.status(200).json(atasament);
        }
    } catch (err) {
        next(err)
    }
})

//------------------------------------Select atasamente dupa primary key------------------------
app.get('/atasament/:id', async (req, res, next) => {
    try {
        let atasament = await Atasamente.findByPk(req.params.id, {
            include: [
                {
                    model: Activitati, as: "Activitati"
                },
            ]

        });
        if (atasament) {

            res.status(200).json(atasament);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//------------------------------------Adauga in atasamente din tabela activitati------------------------
app.post('/activitate/:pid/atasamente', upload.single('fisier'), async (req, res, next) => {
    try {
        const document = req.file.filename;
        await Atasamente.create({
            ReferintaAtasament: document,
            ActivitateID: req.params.pid
        })
        res.status(201).json({ message: "Created" })
    } catch (err) {
        next(err)
    }
})

//------------------------------------Update Atasamente dupa idAtasament si id Activitate------------------------
app.put('/atasament/:tid/:aid', upload.single('fisier'), async (req, res, next) => {
    try {
        let atasament = await Atasamente.findByPk(req.params.tid);
        const document = req.file.filename;
        if (atasament) {
            await atasament.update({
                ReferintaAtasament: document,
                ActivitateID: req.params.aid
            });
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})



//----------------------------------------------ACTIVITATI------------------------------------------

//----------------Inserare in tabela Activitati------------------
app.post('/activitati', async (req, res, next) => {
    try {
        await Activitati.create(req.body, {
            include: [
                {
                    model: Atasamente, as: "Atasamente" //imi afiseaza si atasamentele
                }
            ]
        });
        res.status(201).json({ message: 'created' });
    } catch (err) {
        next(err);
    }
})

//----------------Select din tabela Activitati------------------
app.get('/activitati', async (req, res, next) => {
    try {
        let activitati = await Activitati.findAll({
            // order: [['DenumireActivitate', 'DESC']],
            include: [
                {
                    model: Atasamente, as: "Atasamente"
                },
                {
                    model: Profesori, as: "Profesori",
                    through: {
                        attributes: ["VerificareActivitate"]
                    }
                }
            ]

        });
        res.status(200).json(activitati);
    } catch (err) {
        next(err)
    }
})

//---------------------Select din tabela Activitati dupa Primary key-------------------------
app.get('/activitati/:id', async (req, res, next) => {
    try {
        let activitate = await Activitati.findByPk(req.params.id, {
            include: [
                {
                    model: Atasamente, as: "Atasamente"
                },
                {
                    model: Profesori, as: "Profesori",
                    through: {
                        attributes: ["VerificareActivitate"]
                    }
                }
            ]

        });
        if (activitate) {

            res.status(200).json(activitate);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//---------------------------ACtivitati - NUMAR ACTIVITATI----------------------------
app.get('/numarActivitatiProfesori/:id/:an', async (req, res, next) => {
    try {
        let numarActivitati = await Activitati.count({
            where: {
                [Op.and]: [
                    { '$Profesori.ProfesorID$': req.params.id },
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('DataInceput')), req.params.an)
                ]

            },
            include: [
                {
                    model: Atasamente, as: "Atasamente"
                },
                {
                    model: Profesori, as: "Profesori",
                    through: {
                        attributes: ["VerificareActivitate"]
                    }
                }
            ]
        })
        if (numarActivitati) {

            res.status(200).json(numarActivitati);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//---------------------------ACtivitati - NUMAR ACTIVITATI VERIFICATE----------------------------
app.get('/numarActivitatiProfesoriVerificate/:id/:an/:tip', async (req, res, next) => {
    try {
        let numarActivitati = await Activitati.count({
            where: {
                [Op.and]: [
                    { '$Profesori.ProfesorID$': req.params.id },
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('DataInceput')), req.params.an),
                    { '$Profesori.GestiuneActivitati.VerificareActivitate$': req.params.tip }
                ]

            },
            include: [
                {
                    model: Atasamente, as: "Atasamente"
                },
                {
                    model: Profesori, as: "Profesori",
                    through: {
                        attributes: ["VerificareActivitate"]
                    }
                }
            ]
        })
        if (numarActivitati) {

            res.status(200).json(numarActivitati);
        }
        else {
            res.status(200).json(0);
        }
    } catch (err) {
        next(err)
    }
})



//---------------------Select din tabela Activitati dupa id profesor-------------------------
app.get('/activitat/:pid', async (req, res, next) => {
    try {
        let activitate = await Activitati.findAll({
            where: {
                '$Profesori.ProfesorID$': req.params.pid,
            },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Atasamente, as: "Atasamente"
                },
                {
                    model: Profesori, as: "Profesori",
                    through: {
                        attributes: ["VerificareActivitate"]
                    }
                },
            ]
        });
        if (activitate) {

            res.status(200).json(activitate);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//---------------------Select din tabela Activitati dupa id profesor ordonate dupa data-------------------------
app.get('/activitateDupaData/:pid', async (req, res, next) => {
    try {
        let activitate = await Activitati.findAll({
            where: {
                '$Profesori.ProfesorID$': req.params.pid,
            },
            order: [["DataInceput", "DESC"]],
            include: [
                {
                    model: Atasamente, as: "Atasamente"
                },
                {
                    model: Profesori, as: "Profesori",
                    through: {
                        attributes: ["VerificareActivitate"]
                    }
                },
            ]
        });
        if (activitate) {

            res.status(200).json(activitate);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//---------------------Select din tabela Activitati dupa id profesor si tip activitate-------------------------
app.get('/activita/:pid/:tip', async (req, res, next) => {
    try {
        let activitate = await Activitati.findAll({
            where: {
                '$Profesori.ProfesorID$': req.params.pid,
                '$Profesori.GestiuneActivitati.VerificareActivitate$': req.params.tip
            },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Atasamente, as: "Atasamente"
                },
                {
                    model: Profesori, as: "Profesori",
                    through: {
                        attributes: ["VerificareActivitate"]
                    }
                },
            ]
        });
        if (activitate) {

            res.status(200).json(activitate);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//---------------------Select din tabela Activitati dupa id profesor si an activitate-------------------------
app.get('/activitat/:pid/:an', async (req, res, next) => {
    try {
        let activitate = await Activitati.findAll({
            where: {
                [Op.and]: [
                    { '$Profesori.ProfesorID$': req.params.pid },
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('DataInceput')), req.params.an)
                ]
            },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Atasamente, as: "Atasamente"
                },
                {
                    model: Profesori, as: "Profesori",
                    through: {
                        attributes: ["VerificareActivitate"]
                    }
                },
            ]
        });
        if (activitate) {

            res.status(200).json(activitate);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//---------------------Select din tabela Activitati dupa id profesor, an activitate si status activitate-------------------------
app.get('/activitat/:pid/:an/:status', async (req, res, next) => {
    try {
        let activitate = await Activitati.findAll({
            where: {
                [Op.and]: [
                    { '$Profesori.ProfesorID$': req.params.pid },
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('DataInceput')), req.params.an),
                    { '$Profesori.GestiuneActivitati.VerificareActivitate$': req.params.status }
                ]
            },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Atasamente, as: "Atasamente"
                },
                {
                    model: Profesori, as: "Profesori",
                    through: {
                        attributes: ["VerificareActivitate"]
                    }
                },
            ]
        });
        if (activitate) {

            res.status(200).json(activitate);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//------------------Update tabela Activitati-------------------
app.put('/activitati/:id', async (req, res, next) => {
    try {
        let activitate = await Activitati.findByPk(req.params.id);
        if (activitate) {
            await activitate.update(req.body);
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//-----------------------Delete din tabela Activitati--------------------
app.delete('/activitati/:id', async (req, res, next) => {
    try {
        let activitate = await Activitati.findByPk(req.params.id);
        if (activitate) {
            await activitate.destroy();
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

//-----------------------Delete toate inregistrarie din tabela Activitati--------------------
app.delete('/activitati', async (req, res, next) => {
    try {
        await Activitati.destroy({where: {}});
        res.status(202).json({ message: "accepted" });
        
    } catch (err) {
        next(err)
    }
})


//------------------------------------------------GESTIUNE ACTIVITATI------------------------------------
//----------------Inserare in tabela Gestiune activitati------------------
app.post('/gestiune', async (req, res, next) => {
    try {
        await GestiuneActivitati.create(req.body)
        res.status(201).json({ message: 'created' });
    } catch (err) {
        next(err);
    }
})

//----------------Select din tabela Gestiune activitati------------------
app.get('/gestiune', async (req, res, next) => {
    try {
        let gestiune = await GestiuneActivitati.findAll({
        });
        res.status(200).json(gestiune);
    } catch (err) {
        next(err)
    }
})


//------------------------Select din tabela Gestiune activitati dupa Primary key--------------------
app.get('/gestiune/:id/:aid', async (req, res, next) => {
    try {
        let gestiune = await GestiuneActivitati.findAll({
            where: {
                [Op.and]: [
                    { ProfesorID: req.params.id },
                    { ActivitateID: req.params.aid }
                ]
            }
        });
        if (gestiune) {

            res.status(200).json(gestiune);
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})


//----------------------Update tabela Gestiune activitati----------------------
app.put('/gestiune/:aid', async (req, res, next) => {
    try {
        let gestiune = await GestiuneActivitati.findOne({
            where: {
                ActivitateID: req.params.aid

            }
        });
        if (gestiune) {
            await gestiune.update(req.body);
            res.status(202).json({ message: "accepted" });
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})




export default app;

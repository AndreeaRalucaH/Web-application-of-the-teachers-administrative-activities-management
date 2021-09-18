import axios from 'axios';

async function getProfEmail(email) {
    let newUrl = 'http://localhost:8080/profEmail/' + email;
    return (await axios.get(newUrl)).data;
}

async function getAdminEmail(email) {
    let newUrl = 'http://localhost:8080/admin/' + email;
    return (await axios.get(newUrl)).data;
}

async function getAdminNume(nume) {
    let newUrl = 'http://localhost:8080/administrator/' + nume;
    return (await axios.get(newUrl)).data;
}

async function getTipActivitate(id, tipActivitate) {
    let newUrl = 'http://localhost:8080/activita/' + id + "/" + tipActivitate;
    return (await axios.get(newUrl)).data;
}

async function getActivitateDupaAn(id, an) {
    let newUrl = 'http://localhost:8080/activitat/' + id + "/" + an;
    return (await axios.get(newUrl)).data;
}

async function getActivitatiDupaAnSiStatus(id, an, status) {
    let newUrl = 'http://localhost:8080/activitat/' + id + "/" + an + "/" + status;
    return (await axios.get(newUrl)).data;
}

async function getActivitatiProfesoriDupaIdActivitate(idProf, idActivitate) {
    let newUrl = 'http://localhost:8080/profeso/' + idProf + "/" + idActivitate;
    return (await axios.get(newUrl)).data;
}

async function getAtasamenteDupaIdActivitate(idActivitate) {
    let newUrl = 'http://localhost:8080/atasamente/' + idActivitate;
    return (await axios.get(newUrl)).data;
}

async function getNotitaProfesorDupaIdProfesorSiIdNotita(idProf,idNotita) {
    let newUrl = 'http://localhost:8080/profes/' + idProf + "/" + idNotita;
    return (await axios.get(newUrl)).data;
}

async function getNrActivitatiPeAnDupaIdProf(idProf,an) {
    let newUrl = 'http://localhost:8080/numarActivitatiProfesori/' + idProf + "/" + an;
    return (await axios.get(newUrl)).data;
}

async function getNrProfesoriDupaIdAdmin(idAdmin) {
    let newUrl = 'http://localhost:8080/numarProfesori/' + idAdmin;
    return (await axios.get(newUrl)).data;
}

async function getNrActivitatiPeAnDupaIdProfSiTipActivitate(idProf,an, tip) {
    let newUrl = 'http://localhost:8080/numarActivitatiProfesoriVerificate/' + idProf + "/" + an + "/" + tip;
    return (await axios.get(newUrl)).data;
}

async function updateLoginAdmin(url, idAdmin, item) {
    try {
        return (await axios.put(
            url + "/" + idAdmin ,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}


async function updateActivitatiDinTabelaProfesori(url, idProf, idActiv, item) {
    try {
        return (await axios.put(
            url + "/" + idProf + "/activitati" + "/" + idActiv,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function updateNotiteDinTabelaProfesori(url, idProf, idNotita, item) {
    try {
        return (await axios.put(
            url + "/" + idProf + "/notite" + "/" + idNotita,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function updateAtasamente(url, idAtasament, idActiv, item) {
    try {
        return (await axios.put(
            url + "/" + idAtasament + "/" + idActiv,
            item,
            {
                headers: axios.defaults.headers,
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function postAtasamente(url, idActivitate, item) {
    try {
        return (await axios.post(
            url + "/" + idActivitate + "/atasamente",
            item,
            { headers: axios.defaults.headers, }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}



async function get(url, id = null) {
    try {
        let newUrl = !id ? url : url + "/" + id;
        return (await axios.get(newUrl)).data;
    } catch (e) {
        return e.response.data;
    }
}


async function post(url, item) {
    try {
        return (await axios.post(
            url,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function put(url, id, item) {
    try {
        return (await axios.put(
            url + "/" + id,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function remove(url, id) {
    try {
        return (await axios.delete(
            url + "/" + id
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

export {
    getProfEmail,
    getAdminEmail,
    post,
    postAtasamente,
    get,
    put,
    getAdminNume,
    remove,
    getTipActivitate,
    getActivitateDupaAn,
    getActivitatiDupaAnSiStatus,
    getActivitatiProfesoriDupaIdActivitate,
    updateActivitatiDinTabelaProfesori,
    getAtasamenteDupaIdActivitate,
    updateAtasamente,
    getNotitaProfesorDupaIdProfesorSiIdNotita,
    updateNotiteDinTabelaProfesori,
    getNrActivitatiPeAnDupaIdProf,
    getNrActivitatiPeAnDupaIdProfSiTipActivitate,
    updateLoginAdmin,
    getNrProfesoriDupaIdAdmin
}
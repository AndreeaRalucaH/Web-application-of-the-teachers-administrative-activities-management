class State{
    static isLoggedInAdmin(){
        return sessionStorage.getItem("loggedInAdmin") === null ? false : true;
    }

    static isLoggedInProf(){
        return sessionStorage.getItem("loggedInProf") === null ? false : true;
    }

    static setLoggedStateAdmin(){
        sessionStorage.setItem('loggedInAdmin',JSON.stringify(true));
    }

    static setLoggedStateProf(){
        sessionStorage.setItem('loggedInProf',JSON.stringify(true));
    }

    static setLogoutAdmin(){
        sessionStorage.removeItem("loggedInAdmin")
    }

    static setLogoutProf(){
        sessionStorage.removeItem("loggedInProf")
    }

}

export default State
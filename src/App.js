import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import Login from './Login/Login';
import SignUpAdmin from './Signup/Administrator/SignupAdmin';
import SignupProfesor from './Signup/Profesor/SignupProfesor';
import AfiseazaProfesori from './Components/Administrator/AfiseazaProfesori'
import DashboardAdministrator from './Components/Administrator/DashboardAdministrator'
import AdaugaActivitate from './Components/Profesor/AdaugaActivitate';
import DashboardProfesor from './Components/Profesor/DashboardProfesor'
import AfisareActivitati from './Components/Profesor/AfisareActivitati'
import ActivitatiProfesori from './Components/Administrator/ActivitatiProfesori';
import AfiseazaNotita from './Components/Profesor/AfiseazaNotite';
import AdaugaNotita from './Components/Profesor/AdaugaNotita';
import AfiseazaActivitatiCadreDidactice from './Components/Profesor/AfiseazaActivitatiCadreDidactice';
import ProfilProf from './Components/Profesor/ProfilProf';
import ProfilAdmin from './Components/Administrator/ProfilAdmin';
import State from './Components/State/State';

class App extends Component {
  render() {
    console.log('Is Admin loggedIn: ' + State.isLoggedInAdmin());
    console.log('Is Profesor loggedIn: ' + State.isLoggedInProf());
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}> {/*Ma redirectioneaza catre pagina de Login */}
              <Redirect to="/Login" />
            </Route>
            <Route path="/Login" exact strict component={Login} />
            <Route path="/SignUp/Profesor" exact strict component={SignupProfesor} />
            <Route path="/SignUp/Administrator" exact strict component={SignUpAdmin} />

            {/* <Route path="/Home/Administrator/:id?/AfisareProfesori" exact strict component={AfiseazaProfesori} /> */}
            <Route exact path="/Home/Administrator/:id?/AfisareProfesori" render={props => (!State.isLoggedInAdmin() ? (<Redirect to="/Login" />) : (<AfiseazaProfesori {...props} />))} />

            {/* <Route path="/Home/Administrator/:id?" exact strict component={DashboardAdministrator} /> */}
            <Route exact path="/Home/Administrator/:id?" render={props => (!State.isLoggedInAdmin() ? (<Redirect to="/Login" />) : (<DashboardAdministrator {...props} />))} />

            {/* <Route path="/Home/Administrator/:id?/AfisareActivitati" exact strict component={ActivitatiProfesori} /> */}
            <Route exact path="/Home/Administrator/:id?/AfisareActivitati" render={props => (!State.isLoggedInAdmin() ? (<Redirect to="/Login" />) : (<ActivitatiProfesori {...props} />))} />

            {/* <Route path="/Home/Administrator/:id?/Profil" exact strict component={ProfilAdmin} /> */}
            <Route exact path="/Home/Administrator/:id?/Profil" render={props => (!State.isLoggedInAdmin() ? (<Redirect to="/Login" />) : (<ProfilAdmin {...props} />))} />

            {/* <Route path="/Home/Profesor/:id?/AdaugaActivitate/:idActivitate?/:idAtasament?" exact strict component={AdaugaActivitate} /> */}
            <Route exact path="/Home/Profesor/:id?/AdaugaActivitate/:idActivitate?/:idAtasament?" render={props => (!State.isLoggedInProf() ? (<Redirect to="/Login" />) : (<AdaugaActivitate {...props} />))} />

            {/* <Route path="/Home/Profesor/:id?" exact strict component={DashboardProfesor} /> */}
            <Route exact path="/Home/Profesor/:id?" render={props => (!State.isLoggedInProf() ? (<Redirect to="/Login" />) : (<DashboardProfesor {...props} />))} />

            {/* <Route path="/Home/Profesor/:id?/Activitati" exact strict component={AfisareActivitati} /> */}
            <Route exact path="/Home/Profesor/:id?/Activitati" render={props => (!State.isLoggedInProf() ? (<Redirect to="/Login" />) : (<AfisareActivitati {...props} />))} />
            
            {/* <Route path="/Home/Profesor/:id?/AfiseazaNotita" exact strict component={AfiseazaNotita} /> */}
            <Route exact path="/Home/Profesor/:id?/AfiseazaNotita" render={props => (!State.isLoggedInProf() ? (<Redirect to="/Login" />) : (<AfiseazaNotita {...props} />))} />

            {/* <Route path="/Home/Profesor/:id?/AdaugaNotita/:idNotita?" exact strict component={AdaugaNotita} /> */}
            <Route exact path="/Home/Profesor/:id?/AdaugaNotita/:idNotita?" render={props => (!State.isLoggedInProf() ? (<Redirect to="/Login" />) : (<AdaugaNotita {...props} />))} />

            {/* <Route path="/Home/Profesor/:id?/ActivitatiCadreDidactice" exact strict component={AfiseazaActivitatiCadreDidactice} /> */}
            <Route exact path="/Home/Profesor/:id?/ActivitatiCadreDidactice" render={props => (!State.isLoggedInProf() ? (<Redirect to="/Login" />) : (<AfiseazaActivitatiCadreDidactice {...props} />))} />

            {/* <Route path="/Home/Profesor/:id?/Profil" exact strict component={ProfilProf} /> */}
            <Route exact path="/Home/Profesor/:id?/Profil" render={props => (!State.isLoggedInProf() ? (<Redirect to="/Login" />) : (<ProfilProf {...props} />))} />

          </Switch>
        </BrowserRouter>
      </div>

    );


  }

}

export default App;
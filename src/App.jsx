import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Inicio from './components/Inicio'
import Menu from './components/Menu'
import Login from './components/Login'
import Palabras from './components/Palabras'

//Primero instalo dependencias, limpio el proyecto, configuro firebase, creo componentes, creo sus rutas, autentificacion, crud base de datos

//https://www.heropatterns.com   permite crear diseños de patrones, despues copias y pegas el codigo css

function App() {
  return (
    <div className="container">

      <Router>
        <Menu></Menu>

        <Switch>

          <Route exact path="/">
            <Inicio></Inicio>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>
          
          <Route path="/palabras">
            <Palabras></Palabras>
          </Route>

        </Switch>


      </Router>


    </div>
  );
}

export default App;

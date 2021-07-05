import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {auth} from '../fireBaseConfig'

import Cookies from 'universal-cookie'

// IMPORTS PARA PODER USAR MIS VARIABLES GLOBALES
import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

//instancio el objeto cookis. aqui tengo lo que cree en LOGIN
const cookies = new Cookies()


//npm i reactstrap , es bootstrap para react, incorpora componentes con estado, ayuda a que dentro de react podamos psarle parametro estado y funcionar con eso


const Menu = () =>{

    //const [usuario, setUsuario] = useState(null)
    const historial = useHistory() //esta constante empuja al husuario a la ruta que queremos


    const [{ usuario }, dispatch] = useStateValue();

    // useEffect( ()=>{//cada vez que se actualice o entre a la pagina comprueba si existe un usuario logueado en la app, si lo hay lo setea
    //     auth.onAuthStateChanged( (user)=>{ //capturamos un usuario
    //         if (user){ //si existe un usuario, seteamos un usuario dentro del estado, si no existe no hace nada, no entra al IF porque no hay ningun user logueado
    //             setUsuario(user.email) //luego comprobamos si es distinto a null o si es positivo. Mostramos todo debajo del boton
    //             console.log(user.email)
    //         }
    //     })
    // }, []) //antes de cerrar el useEffect ponemos el array vacio, para que no genere un loop infinito intentando comprobar constantemente si hay un usuario logueado


    const cerrarSesion = () =>{
        // auth.signOut() //cierra la sesion por firebase
        // //hay que setear el usuario a null, asi desaparece el boton de cerrar sesion
        // setUsuario(null)

        // //dejamos las cookies vacias, para que si alguien sin estar logueado quisiera entrar a la seccion palabras poniendo /palabras en el link, podria entrar a la del ultimo usuario logueado
        // cookies.set("emailUsuario", null, {path: '/'})
        // cookies.set("passwordUsuario", null, {path: '/'})

        dispatch({
            type: actionTypes.SET_USUARIO,
            usuario: null
        })

        //empujamos al usuario cuando se pulsa el boton de cerrar sesion al INICIO
        historial.push('/')
    }

    const [botonMenu, setBotonMenu] = useState(false)

    const modificarBotonMenu = () =>{
        setBotonMenu(!botonMenu)
    }



    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Chopon Vocabulary</Link>
                <button className="navbar-toggler" type="button" onClick={modificarBotonMenu} data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>

                    {
                        usuario ?
                        (
                            <Link className="nav-link" to="/palabras">Palabras</Link>
                        )
                        :
                        (
                            <Link className="nav-link" to="/login">Login</Link>
                        )
                    }

                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </div>
                </div>
                {
                usuario ? 
                (//si existe un usuario logueado entra aca
                    <button className="btn btn-danger" onClick={cerrarSesion}>Cerrar Sesion</button>
                )
                :
                (//sino, entra aca y no hacemos nada. SPAN no tiene renderizado ni margenes, asi que ni se ve 
                    <span></span>
                )
                }
            </div>

        </nav>
    )
}


export default Menu;


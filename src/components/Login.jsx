import React, { useState } from 'react'
import { auth } from '../fireBaseConfig' //no es una dependencia, es un archivo que esta en el proyecto que me exporta AUTH
import { useHistory } from 'react-router-dom'

import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

import Cookies from 'universal-cookie'
//npm i universal-cookie instalar  broja: https://www.youtube.com/watch?v=1oi9mDNlVZw&ab_channel=BorjaScript

//onChange, onSubmit, onClick


const Login = () => {

    //vinculamos estos estados de la app, en los inputs con ONCHANGE
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [mensajeError, setMensajeError] = useState(null)

    const historial = useHistory()

    const cookies = new Cookies()


    const [{ usuario }, dispatch] = useStateValue();


    //hacemos esta funcion para guardar las cookies del usuario logueado, la llamamos en la funcion de login y de registrar. asi no hacemos este codigo 2 veces
    const loginCorrecto = () => {
        

        //puede ser el dato que quieras, la cantidad de datos que quieras, pero siempre el PATH con la barra para que se pueda usar en TODAS las paginas. si quisieras que solo se use en X componente pones path: '/pálabras' por ejemplo
        // cookies.set("emailUsuario", email, {path: '/'})
        // cookies.set("passwordUsuario", pass, {path: '/'})

        dispatch({
            type: actionTypes.SET_USUARIO,
            usuario: email
        })

        //funcion de javascript para que nos mande a la ruta que querramos, en este caso no la voy a usar porque uso HISTORY con PUSH para mandar siempre al inicio. lo llamo en login y registrar, dentro del THEN
        //window.location.href = './palabras'
        historial.push('/')

    }

    const registrarUsuario = (e) => { //en el formulario con ONSUBMIT llamo esta funcion.
        e.preventDefault() //esto hace que cuando se pulse el boton de registrar, el evento se captura del parametro, y evita el comportamiento natural del navegador de refrescar el formulario
        auth.createUserWithEmailAndPassword(email, pass)//variables del estado, con useState. 
            .then(r => { //si es positivo viene por aca
                loginCorrecto()
                historial.push('/')//cuando se loguee, lo empujamos a la ruta de la barra, la de inicio 
            })
            .catch(e => { //si es negativo viene por aca
                //console.log(e.code) //si viene un error lo mostramos en el catch
                //estos errores los seteamos con un estado "auth/invalid-email" "auth/weak-password"

                if (e.code == "auth/invalid-email") {
                    setMensajeError("Formato de Email incorrecto")
                }
                if (e.code == "auth/weak-password") {
                    setMensajeError("La password debe tener minimo 6 caracteres!")
                }
            })
    }


    const loginUsuario = () => {
        //necesitamos conectarnos al servicio de atentificacion de firebase
        auth.signInWithEmailAndPassword(email, pass) //le pasamos el email que seteamos en el input de con onChange, de email y de pass
            .then(r => { //R es la respuesta, si es positiva la capturamos aca
                loginCorrecto()
                historial.push('/')//cuando se loguee, lo empujamos a la ruta de la barra, la de inicio
            })
            .catch((err) => { //si hay un error lo seteamos aca, pueden ser muchos mas. por consola vemos que errores puede llegar a dar y los conemplamos
                //console.log(err.code) "auth/wrong-password"
                if (err.code == "auth/wrong-password") {
                    setMensajeError("Password incorrecta") //cuando entre aca y luego debajo del formulario pregunte si es null, muestro este mensaje.
                }
            })
    }


    if (usuario == null){ //VALIDAMOS que no haya nadie logueado, asi el login no se pueda hacer si ya hay un usuario iniciado
        return (
            <div className="row mt-5">
                <div className="col"></div>
                <div className="col">
                    <div className="card card-body">
                        <form onSubmit={registrarUsuario} className="form-group">
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="form-control"
                                type="text"
                                placeholder="Correo Electronico">
                            </input>
    
                            <input
                                onChange={(e) => { setPass(e.target.value) }}
                                className="form-control mt-3"
                                type="password"
                                placeholder="Contraseña">
                            </input>
    
    
    
                            <p className="mt-5">No tienes cuenta? Create una!</p>
                            <input
                                className="form-control btn btn-info "
                                type="submit"
                                value="Registrar Usuario">
                            </input>
    
    
                        </form>
                        {/* en un FORMULARIO no pueden haber dos onSubmit, podria poner 2 botones con ONCLICK, o puedo hacerlo de esta manera. si dejo este boton en el formulario, cuando se apriete el de iniciar sesion, salta el onSubmit del formulario a registrar. tambien se podria crear una tabla y ahi si poder poner 2 onsubmit*/}
                        <button onClick={loginUsuario} className="btn btn-success form-control mt-2" >
                            Iniciar sesion
                        </button>
                    </div>
                    {
                        mensajeError != null ? //fuera del formulario, pregunto si el mensaje de error es nullo, si no es nullo es porque hubo un error y tengo que mostrar cual fue
                            (
                                <div className="alert alert-danger" role="alert">
                                    {mensajeError}
                                </div>
                            )
                            :
                            (
                                <span></span>
                            )
                    }
    
    
                </div>
    
                <div className="col"></div>
    
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>¡¡¡ Por estar logueado no tenes permitido acceder a la seccion LOGIN !!!</h1>
            </div>
        )
    }
    
}


export default Login;


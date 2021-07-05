import React, { useState, useEffect } from 'react'
import { store } from '../fireBaseConfig'
import { Button, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'

import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

import Cookies from 'universal-cookie'

const Palabras = () => {

    //para los 2 inputs
    const [palabraEspañol, setPalabraEspañol] = useState("")
    const [palabraIngles, setPalabraIngles] = useState("")
    const [palabraSelec, setPalabraSeleccionada] = useState({ id: "", significadoEs: "", significadoIn: "" })


    //para los mensajes de error
    const [error, setError] = useState("")

    //array vacio que vamos a ir llenando para mostrar por pantalla el listado
    const [palabras, setPalabras] = useState([])

    //instancio el objeto cookis. aqui tengo lo que cree en LOGIN
    const cookies = new Cookies()


    const [{ usuario }, dispatch] = useStateValue();



    // ------------------------------------------------

    //creo este estado para la ventana modal de ELIMINAR
    const [estadoVentanaEliminar, setEstadoVentanaEliminar] = useState(false)

    //funcion que setea el estado de la ventana, invirtiendo su valor. si la llamamos, por ejemplo en el boton de cerrar, va a ponerla en FALSE entonces se cierra
    const abrirModalEliminar = () => {
        setEstadoVentanaEliminar(!estadoVentanaEliminar)
    }




    //creo este estado para la ventana modal de EDICION
    const [estadoVentanaEditar, setEstadoVentanaEditar] = useState(false)

    //funcion que setea el estado de la ventana, invirtiendo su valor. si la llamamos, por ejemplo en el boton de cerrar, va a ponerla en FALSE entonces se cierra
    const abrirModalEditar = () => {
        setEstadoVentanaEditar(!estadoVentanaEditar)
    }



    //creo este estado para la ventana modal de AGREGAR PALABRA
    const [estadoVentanaAgregar, setEstadoVentanaAgregar] = useState(false)

    //funcion que setea el estado de la ventana, invirtiendo su valor. si la llamamos, por ejemplo en el boton de cerrar, va a ponerla en FALSE entonces se cierra
    const abrirModalAgregar = () => {
        setEstadoVentanaAgregar(!estadoVentanaAgregar)
    }



    // ------------------------------------------------





    useEffect(() => { //esta funcion trae todas las palabras, las seteamos en el array y el array lo pasamos al estado de PALABRAS
        const mostrarPalabras = async () => {//es una peticion asincrona, es una promesa que genera un hilo independiente al principal de ejecucion
            const nombreTabla = ("palabras - " + usuario) //nombre de la tabla creado con el usuario que esta logueado
            const { docs } = await store.collection(nombreTabla).get() //esto da como resultado un objeto. por eso DOCS lo pongo asi y no normal. es lo mismo que. const respuesta = ...; y luego acceder como respuesta.docs, te ahorras eso porque docs es una propiedad de la respuesta
            const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))//por cada mapeo, se devuelve un objeto. primero ID, de la iteracion, del puntero que apunta a esa seccion. segunda, dentro de la propiedad DATA viajan muchos campos, y los ...(RES) basicamente guarda todo igual que como viene en DATA 
            setPalabras(nuevoArray) //el array de PALABRAS del estado, lo seteamos con el nuevo array que generamos. luego lo mostramos en el listado mapeandolo
        }



        mostrarPalabras() //antes de terminar USSEEFECT, llamo a la constante que creamos
    }, []) //pasarle un array vacio, si no usamos dependencias que refresquen este componente, pasarle este array sino se genera un bucle y no anda la app, se consumen los servicios, hace peticiones, etc



    //para añadir una palabra
    const agregarPalabra = async (e) => {
        //tenemos que comprobar si el evento del formulario que viene por parametro. hay que comprobar si los campos no estan vacios
        e.preventDefault() //evitamos comportamiento natural del navegador de irse a otro sitio, que no se actuallice
        if (!palabraEspañol.trim()) {
            setError('El campo Español esta vacio')
            return
        } else if (!palabraIngles.trim()) {
            setError('El campo Ingles esta vacio')
            return

        }


        const palabra = {
            significadoEs: palabraEspañol,
            significadoIn: palabraIngles
        }

        try {
            abrirModalAgregar()
            const nombreTabla = ("palabras - " + usuario)
            const data = await store.collection(nombreTabla).add(palabra) //añadir un objeto de javascript, luego se parsea a jason a AGENDA

            //copiamos de la async del UseEffect. los await son promesas, si dan positivo se ejecutan, sino lanzan un error
            const { docs } = await store.collection(nombreTabla).get() //store.collection('agenda').get() -> esto da como resultado un objeto. por eso DOCS lo pongo asi y no normal. es lo mismo que. const respuesta = ...; y luego acceder como respuesta.docs, te ahorras eso porque docs es una propiedad de la respuesta
            const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() })) //por cada mapeo, se devuelve un objeto. primero ID, de la iteracion, del puntero que apunta a esa seccion. segunda, dentro de la propiedad DATA viajan muchos campos, y los ...(RES) basicamente guarda todo igual que como viene en DATA  
            setPalabras(nuevoArray);
            //alert("Palabra añadida correctamente") //este se muestra en el hilo proncipal, mientras los await estan en hilos independientes. cuando terminan, estan listos, sacas el alert y muestra todo

        } catch (e) {
            console.log(e)
        }

        //cuando apretas registrar, se vaciaran los campos, pero en los inputs poniendo el value con el nombre y phone del useState
        setPalabraEspañol("")
        setPalabraIngles("")

    }

    //para editar una palabra, en una ventana modal. tenes 2 maneras de hacerlo, buscar por el ID en la base de datos la palabra, traerla, modificarla y volver añadirla. o podes desde el mapeo del return, donde ya tenes los valores, cargarlos en un state y ahorrarte la consulta por ID al a BD
    const editarPalabra = async (e) => {
        //console.log(palabraSelec)
        e.preventDefault()

        if (!palabraEspañol.trim()) {
            setError("El campo 'palabra en español' esta vacio!!")
            return
        } else if (!palabraIngles.trim()) {
            setError("El campo 'palabra en ingles' esta vacio!!")
            return
        }

        const palabrasNuevas = {//creo un nuevo objeto con las 2 palabras ingresadas
            significadoEs: palabraEspañol, //palabraEspañol e ingles son los estados que se modificaron en el formulario de edicion
            significadoIn: palabraIngles
        }

        try {
            abrirModalEditar()
            const nombreTabla = ("palabras - " + usuario) //(cookies.get('emailUsuario'))
            await store.collection(nombreTabla).doc(palabraSelec.id).set(palabrasNuevas)

            //modificacion del array para mostrar la lista actualizada
            const { docs } = await store.collection(nombreTabla).get() //store.collection('agenda').get() -> esto da como resultado un objeto. por eso DOCS lo pongo asi y no normal. es lo mismo que. const respuesta = ...; y luego acceder como respuesta.docs, te ahorras eso porque docs es una propiedad de la respuesta
            const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() })) //por cada mapeo, se devuelve un objeto. primero ID, de la iteracion, del puntero que apunta a esa seccion. segunda, dentro de la propiedad DATA viajan muchos campos, y los ...(RES) basicamente guarda todo igual que como viene en DATA  
            setPalabras(nuevoArray);

        } catch (e) {
            console.log(e)
        }

        setPalabraEspañol("")
        setPalabraIngles("")
        setPalabraSeleccionada({ id: "", significadoEs: "", significadoIn: "" })

    }

    //tiene una pequeña ventana modal de confirmacion de si queres eliminar la palabra
    const borrarPalabra = async (e) => {
        try {
            abrirModalEliminar()
            const nombreTabla = ("palabras - " + usuario)
            await store.collection(nombreTabla).doc(palabraSelec.id).delete()
            //para mostrar la lista actualizada
            const { docs } = await store.collection(nombreTabla).get()
            const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
            setPalabras(nuevoArray)

        } catch (e) {
            console.log(e)
        }

    }


    if (usuario != null) { //validamos que haya un usuario cargado en la cookie, asi mostramos sus palabras y el formulario. 
        return (
            <div className="container">

                <div className="col">
                    <h1>Listado de Palabras</h1>
                    <h3> Usuario: {usuario}</h3>
                    <button onClick={(e) => { abrirModalAgregar() }} className="btn btn-info">
                        Agregar Palabra
                    </button>
                    <i className="fas fa-search float-right"> 
                        
                    </i>
                    <table className="table table-striped">
                        <thead className="table table-dark ">
                            <tr>
                                <td>Español</td>
                                <td>Ingles</td>
                                <td className="float-right">Operaciones</td>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                palabras.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.significadoEs}</td>
                                        <td>{item.significadoIn}</td>
                                        <td>
                                            <button onClick={(e) => {
                                                setPalabraSeleccionada(item)
                                                abrirModalEliminar()

                                            }} className="btn btn-danger fas fa-trash-alt float-right" title="Borrar palabra" type="submit"></button>

                                            <button onClick={(e) => {
                                                setPalabraSeleccionada(item)
                                                abrirModalEditar()
                                            }} className="btn btn-success fas fa-edit float-right" title="Editar palabra" type="submit"></button>

                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                </div>






                <Modal isOpen={estadoVentanaEliminar}>
                    <ModalHeader>
                        Esta Seguro de Eliminar ?
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <p>Palabra Español: {palabraSelec.significadoEs}</p>

                        </FormGroup>
                        <FormGroup>
                            <p>Palabra Ingles: {palabraSelec.significadoIn}</p>

                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={(e) => { borrarPalabra(e) }} >Si</Button>
                        <Button color="secondary" onClick={abrirModalEliminar}>No </Button>
                    </ModalFooter>
                </Modal>



                <Modal isOpen={estadoVentanaEditar}>
                    <ModalHeader>
                        Editar Palabra
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label> Palabra Español</Label>
                            <Input type="text" placeholder="Palabra Español" value={palabraSelec.significadoEs} name={palabraSelec.significadoEs}  onChange={(e) => { setPalabraEspañol(e.target.value) }} /> {/* value={palabraSelec.significadoEs} no anda el value, ni cambiando por el input normal. lo uso sin value */}
                        </FormGroup>
                        <FormGroup>
                            <Label> Palabra Ingles</Label>
                            <Input type="text" placeholder="Palabra Ingles" value={palabraSelec.significadoIn} name={palabraSelec.significadoIn} onChange={(e) => { setPalabraIngles(e.target.value) }} />
                        </FormGroup>
                    </ModalBody>
                    {

                        error ? 
                        (
                            <div class="alert alert-danger" role="alert">
                                {error}
                            </div>

                        )
                        :
                        (
                            <span></span>
                        )
                    }

                    <ModalFooter>
                        <Button color="primary" onClick={(e) => { editarPalabra(e) }}>Guardar palabra</Button>
                        <Button color="secondary" onClick={abrirModalEditar}>Cerrar </Button>
                    </ModalFooter>
                </Modal>



                <Modal isOpen={estadoVentanaAgregar}>
                    <ModalHeader>
                        Agregar palabra
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label> Palabra Español</Label>
                            <Input type="text" placeholder="Introduce la palabra en Español" onChange={(e) => { setPalabraEspañol(e.target.value) }} />
                        </FormGroup>
                        <FormGroup>
                            <Label> Palabra Ingles</Label>
                            <Input type="text" placeholder="Introduce la palabra en Ingles" onChange={(e) => { setPalabraIngles(e.target.value) }} />
                        </FormGroup>
                    </ModalBody>
                    {
                        error ? 
                        (
                            <div class="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )
                        :
                        (
                            <span></span>
                        )
                    }
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => { agregarPalabra(e) }}>Guardar palabra</Button>
                        <Button color="secondary" onClick={abrirModalAgregar}>Cerrrar </Button>
                    </ModalFooter>
                </Modal>


            </div> // LO QUE SE INGRESA EN INPUT MODAL EDITAR DE PALABRA EN ESPAÑOL, LO GUARDO EN SETPALABRAESPAÑOL. Y TAMB CON LA DE INGLES, Y EN EDITARPALABRA SETEO CON ESOS ESTADOS
        )

    }
    else { //solo entrara a este ELSE, si el usuario sin estar logueado intenta entrar por el link poniendo /palabras. 
        return (
            <div>
                <h1>¡¡¡ Por no estar logueado no tenes permitido acceder a la seccion PALABRAS !!!</h1>
            </div>
        )
    }

}


export default Palabras;




















// import React, { useState, useEffect } from 'react'
// import { store } from '../fireBaseConfig'
// import { Button, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'


// import Cookies from 'universal-cookie'

// const Palabras = () => {

//     //para los 2 inputs
//     const [palabraEspañol, setPalabraEspañol] = useState("")
//     const [palabraIngles, setPalabraIngles] = useState("")
//     const [palabraSelec, setPalabraSeleccionada] = useState({ id: "", significadoEs: "", significadoIn: "" })


//     //para los mensajes de error
//     const [error, setError] = useState("")

//     //array vacio que vamos a ir llenando para mostrar por pantalla el listado
//     const [palabras, setPalabras] = useState([])

//     //instancio el objeto cookis. aqui tengo lo que cree en LOGIN
//     const cookies = new Cookies()





//     // ------------------------------------------------

//     //creo este estado para la ventana modal de ELIMINAR
//     const [estadoVentana, setEstadoVentana] = useState(false)


//     //funcion que setea el estado de la ventana, invirtiendo su valor. si la llamamos, por ejemplo en el boton de cerrar, va a ponerla en FALSE entonces se cierra
//     const abrirModal = () => {
//         setEstadoVentana(!estadoVentana)
//     }



//     //creo este estado para la ventana modal de EDICION
//     const [estadoVentana2, setEstadoVentana2] = useState(false)


//     //funcion que setea el estado de la ventana, invirtiendo su valor. si la llamamos, por ejemplo en el boton de cerrar, va a ponerla en FALSE entonces se cierra
//     const abrirModal2 = () => {
//         setEstadoVentana2(!estadoVentana2)
//     }




//     // ------------------------------------------------






//     useEffect(() => { //esta funcion trae todas las palabras, las seteamos en el array y el array lo pasamos al estado de PALABRAS
//         const mostrarPalabras = async () => {//es una peticion asincrona, es una promesa que genera un hilo independiente al principal de ejecucion
//             const nombreTabla = ("palabras - " + (cookies.get('emailUsuario'))) //nombre de la tabla creado con el usuario que esta logueado
//             const { docs } = await store.collection(nombreTabla).get() //esto da como resultado un objeto. por eso DOCS lo pongo asi y no normal. es lo mismo que. const respuesta = ...; y luego acceder como respuesta.docs, te ahorras eso porque docs es una propiedad de la respuesta
//             const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))//por cada mapeo, se devuelve un objeto. primero ID, de la iteracion, del puntero que apunta a esa seccion. segunda, dentro de la propiedad DATA viajan muchos campos, y los ...(RES) basicamente guarda todo igual que como viene en DATA 
//             setPalabras(nuevoArray) //el array de PALABRAS del estado, lo seteamos con el nuevo array que generamos. luego lo mostramos en el listado mapeandolo
//         }

//         mostrarPalabras() //antes de terminar USSEEFECT, llamo a la constante que creamos
//     }, []) //pasarle un array vacio, si no usamos dependencias que refresquen este componente, pasarle este array sino se genera un bucle y no anda la app, se consumen los servicios, hace peticiones, etc



//     //para añadir una palabra
//     const agregarPalabra = async (e) => {
//         //tenemos que comprobar si el evento del formulario que viene por parametro. hay que comprobar si los campos no estan vacios
//         e.preventDefault() //evitamos comportamiento natural del navegador de irse a otro sitio, que no se actuallice
//         if (!palabraEspañol.trim()) {
//             setError('El campo Español esta vacio')
//             return
//         } else if (!palabraIngles.trim()) {
//             setError('El campo Ingles esta vacio')
//             return

//         }



//         const palabra = {
//             significadoEs: palabraEspañol,
//             significadoIn: palabraIngles
//         }

//         try {
//             const nombreTabla = ("palabras - " + (cookies.get('emailUsuario')))
//             const data = await store.collection(nombreTabla).add(palabra) //añadir un objeto de javascript, luego se parsea a jason a AGENDA

//             //copiamos de la async del UseEffect. los await son promesas, si dan positivo se ejecutan, sino lanzan un error
//             const { docs } = await store.collection(nombreTabla).get() //store.collection('agenda').get() -> esto da como resultado un objeto. por eso DOCS lo pongo asi y no normal. es lo mismo que. const respuesta = ...; y luego acceder como respuesta.docs, te ahorras eso porque docs es una propiedad de la respuesta
//             const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() })) //por cada mapeo, se devuelve un objeto. primero ID, de la iteracion, del puntero que apunta a esa seccion. segunda, dentro de la propiedad DATA viajan muchos campos, y los ...(RES) basicamente guarda todo igual que como viene en DATA  
//             setPalabras(nuevoArray);
//             alert("Palabra añadida correctamente") //este se muestra en el hilo proncipal, mientras los await estan en hilos independientes. cuando terminan, estan listos, sacas el alert y muestra todo

//         } catch (e) {
//             console.log(e)
//         }

//         //cuando apretas registrar, se vaciaran los campos, pero en los inputs poniendo el value con el nombre y phone del useState
//         setPalabraEspañol("")
//         setPalabraIngles("")

//     }

//     //para editar una palabra, en una ventana modal
//     const editarPalabra = async (e) => {
//         //console.log(palabraSelec)
//         e.preventDefault()

//         if (!palabraEspañol.trim()){
//             setError("El campo 'palabra en español' esta vacio!!")
//             return
//         }else if (!palabraIngles.trim()){
//             setError("El campo 'palabra en ingles' esta vacio!!")
//             return
//         }

//         const palabrasNuevas = {//creo un nuevo objeto con las 2 palabras ingresadas
//             significadoEs: palabraEspañol, //palabraEspañol e ingles son los estados que se modificaron en el formulario de edicion
//             significadoIn: palabraIngles
//         }

//         try{
//             abrirModal2()
//             const nombreTabla = ("palabras - " + (cookies.get('emailUsuario')))
//             await store.collection(nombreTabla).doc(palabraSelec.id).set(palabrasNuevas)

//             //modificacion del array para mostrar la lista actualizada
//             const { docs } = await store.collection(nombreTabla).get() //store.collection('agenda').get() -> esto da como resultado un objeto. por eso DOCS lo pongo asi y no normal. es lo mismo que. const respuesta = ...; y luego acceder como respuesta.docs, te ahorras eso porque docs es una propiedad de la respuesta
//             const nuevoArray = docs.map( item => ({id:item.id, ...item.data()})) //por cada mapeo, se devuelve un objeto. primero ID, de la iteracion, del puntero que apunta a esa seccion. segunda, dentro de la propiedad DATA viajan muchos campos, y los ...(RES) basicamente guarda todo igual que como viene en DATA  
//             setPalabras(nuevoArray);

//         }catch(e){
//             console.log(e)
//         }

//         setPalabraEspañol("")
//         setPalabraIngles("")
//         setPalabraSeleccionada({ id: "", significadoEs: "", significadoIn: "" })

//     }

//     //tiene una pequeña ventana modal de confirmacion de si queres eliminar la palabra
//     const borrarPalabra = async (e) => {
//         try {
//             abrirModal()
//             const nombreTabla = ("palabras - " + (cookies.get("emailUsuario")))
//             await store.collection(nombreTabla).doc(palabraSelec.id).delete()
//             //para mostrar la lista actualizada
//             const { docs } = await store.collection(nombreTabla).get()
//             const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
//             setPalabras(nuevoArray)

//         } catch (e) {
//             console.log(e)
//         }

//     }


//     if ((cookies.get("emailUsuario")) != " ") { //validamos que haya un usuario cargado en la cookie, asi mostramos sus palabras y el formulario. 
//         return (
//             <div className="container">
//                 <div className="row mt-5">
//                     <div className="col">
//                         <h1>Formulario Palabras</h1>
//                         <div className="card card-body">
//                             <form onSubmit={agregarPalabra}>
//                                 <input value={palabraEspañol} onChange={(e) => { setPalabraEspañol(e.target.value) }} className="form-control" type="text" placeholder="Palabra en Español"></input>
//                                 <input value={palabraIngles} onChange={(e) => { setPalabraIngles(e.target.value) }} className="form-control mt-1" type="text" placeholder="Palabra en Ingles"></input>
//                                 <input type="submit" value="Guardar palabra" className="btn btn-success btn btn-block mt-3 animate__animated animate__heartBeat" ></input>
//                             </form>
//                         </div>
//                         {
//                             error
//                         }


//                     </div>

//                     <div className="col">
//                         <h1>Listado de Palabras</h1>
//                         <h3> Usuario: {cookies.get('emailUsuario')}</h3>
//                         <table className="table table-striped ">
//                             <thead className="table table-dark ">
//                                 <tr>
//                                     <td>Español</td>
//                                     <td>Ingles</td>
//                                     <td className="float-right">Operaciones</td>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     palabras.map(item => (
//                                         <tr key={item.id}>
//                                             <td>{item.significadoEs}</td>
//                                             <td>{item.significadoIn}</td>
//                                             <td>
//                                                 <button onClick={(e) => {
//                                                     setPalabraSeleccionada(item)
//                                                     abrirModal()

//                                                 }} className="btn btn-danger float-right" type="submit">Delete</button>

//                                                 <button onClick={ (e) =>{
//                                                     setPalabraSeleccionada(item)
//                                                     abrirModal2()
//                                                 }} className="btn btn-success float-right" type="submit">Edit</button>

//                                             </td>
//                                         </tr>
//                                     ))

//                                 }
//                             </tbody>
//                         </table>
//                     </div>

//                 </div>




//                 <Modal isOpen={estadoVentana}>
//                     <ModalHeader>
//                         Esta Seguro de Eliminar ?
//                     </ModalHeader>

//                     <ModalBody>
//                         <FormGroup>
//                             <p>Palabra Español: {palabraSelec.significadoEs}</p>

//                         </FormGroup>
//                         <FormGroup>
//                             <p>Palabra Ingles: {palabraSelec.significadoIn}</p>

//                         </FormGroup>
//                     </ModalBody>

//                     <ModalFooter>
//                         <Button color="primary" onClick={(e) => { borrarPalabra(e) }} >Si</Button>
//                         <Button color="secondary" onClick={abrirModal}>No </Button>
//                     </ModalFooter>
//                 </Modal>


//                 <Modal isOpen={estadoVentana2}>
//                     <ModalHeader>
//                         Editar Palabra
//                     </ModalHeader>

//                     <ModalBody>
//                         <FormGroup>
//                             <Label> Palabra Español</Label>
//                             <Input type="text"  placeholder="Palabra Español" value={palabraSelec.significadoEs} onChange={(e) =>{setPalabraEspañol(e.target.value)}}/>
//                         </FormGroup>
//                         <FormGroup>
//                             <Label> Palabra Ingles</Label>
//                             <Input type="text" placeholder="Palabra Ingles" value={palabraSelec.significadoIn} onChange={(e) => {setPalabraIngles(e.target.value)}} />
//                         </FormGroup>
//                     </ModalBody>
//                                 {
//                                     error
//                                 }
//                     <ModalFooter>
//                         <Button color="primary" onClick={(e) => { editarPalabra(e) }}>Guardar palabra</Button>
//                         <Button color="secondary" onClick={abrirModal2}>Cerrrar </Button>
//                     </ModalFooter>
//                 </Modal>


//             </div> // LO QUE SE INGRESA EN INPUT MODAL EDITAR DE PALABRA EN ESPAÑOL, LO GUARDO EN SETPALABRAESPAÑOL. Y TAMB CON LA DE INGLES, Y EN EDITARPALABRA SETEO CON ESOS ESTADOS
//         )

//     }
//     else { //solo entrara a este ELSE, si el usuario sin estar logueado intenta entrar por el link poniendo /palabras. 
//         return (
//             <div>
//                 <h1>¡¡¡ Por no estar logueado no tenes permitido acceder a la seccion PALABRAS !!!</h1>
//             </div>
//         )
//     }

// }


// export default Palabras;
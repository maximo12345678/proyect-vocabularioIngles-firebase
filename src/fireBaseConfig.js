import firebase from 'firebase'
import 'firebase/auth' //servicio de autenticacion
import 'firebase/firestore' //servicio de base de datos

//esta config lo que hace es SDK, conectar el equipo con el servidor de firebase, no con firebase autentificaion.
const firebaseConfig = {

  apiKey: "AIzaSyAGsLRV33j0OU1NNG-HUvyxx36KZmrJhwU",
  authDomain: "tercerproyecto-f52e9.firebaseapp.com",
  projectId: "tercerproyecto-f52e9",
  storageBucket: "tercerproyecto-f52e9.appspot.com",
  messagingSenderId: "32274076343",
  appId: "1:32274076343:web:c25ad7f37df22c175a7332",
  measurementId: "G-WES6JMTXKF"

  // apiKey: "AIzaSyAlNWMHHwTX1XEE0xH0nSL_V4HqtI79764",
  // authDomain: "twoproyect-5707f.firebaseapp.com",
  // projectId: "twoproyect-5707f",
  // storageBucket: "twoproyect-5707f.appspot.com",
  // messagingSenderId: "65851522039",
  // appId: "1:65851522039:web:8f839e8d383ff155cc8cf2",
  // measurementId: "G-Q8B057MKDL"

};

// Inicializando el servicio de Firebase. 
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth() //aca esta todo el objeto o el servicio de firebase autenticacion
const store = fire.firestore(); //aca esta todo el objeto o el servicio de firebase autenticacion

export { auth } //lo exportamos 
export { store } //lo exportamos 












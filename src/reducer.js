export const initialState = {//para que se pueda consumir en index.js
    usuario: null, //creamos un usuario vendedor que empieza siendo null, este lo podemos usar en todo el codigo

}



export const actionTypes = {
    SET_USUARIO: "SET_USUARIO",

}



const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "SET_USUARIO"://desde login llenamos este con el dispatch
            return {
                ...state,
                usuario: action.usuario
            }


        default: return state; //en caso de default solo retornamos el state
    }

}

export default reducer;


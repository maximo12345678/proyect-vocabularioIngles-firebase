import React from 'react'
import { Redirect } from 'react-router';

const Inicio = () =>{
    return(
        <div className="mt-5">
            <h1>Inicio</h1>
            <h2>En esta pagina podras perfeccionar tu vocabulario de ingles, anotando las palabras que quieras para que siempre recuerdes su significado en ambos idiomas, español e ingles.</h2>
            <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laborum commodi pariatur reprehenderit id? Commodi sed, saepe aperiam autem vitae cum animi ducimus provident eius, esse numquam expedita doloremque voluptatibus?</p>
            <div className="card card-body mt-4">
                <b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iusto consequatur, culpa placeat, repellendus recusandae necessitatibus blanditiis libero qui, incidunt mollitia praesentium maiores tenetur natus fuga ipsum provident excepturi nostrum. Primero se detecta el problema y despues se piensa una solucion</b>
            </div>
            <h2 className="mt-4">TARJETAS</h2>
            <div className="row mt-4">
                <div className="col">
                    <div className="card card-body">
                        <p>El mandatario reconoció que no consensuó los detalles del nuevo decreto con el jefe de Gobierno de la Ciudad de Buenos Aires, Horacio Rodríguez Larreta, y deslizó que la Policía de la Ciudad no actuaba en las calles para hacer cumplir las restricciones nocturnas anunciadas el viernes de la semana pasada.</p>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-body">
                        <p>El mandatario reconoció que no consensuó los detalles del nuevo decreto con el jefe de Gobierno de la Ciudad de Buenos Aires, Horacio Rodríguez Larreta, y deslizó que la Policía de la Ciudad no actuaba en las calles para hacer cumplir las restricciones nocturnas anunciadas el viernes de la semana pasada.</p>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-body">
                        <p>El mandatario reconoció que no consensuó los detalles del nuevo decreto con el jefe de Gobierno de la Ciudad de Buenos Aires, Horacio Rodríguez Larreta, y deslizó que la Policía de la Ciudad no actuaba en las calles para hacer cumplir las restricciones nocturnas anunciadas el viernes de la semana pasada.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Inicio;
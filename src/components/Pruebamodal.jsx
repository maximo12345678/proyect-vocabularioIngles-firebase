import React , {useState }from 'react'
import { Button, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'

const Pruebamodal =()=> {
  
    const [estadoVentana, setEstadoVentana]= useState(false)


    const abrirModal = () =>{
        setEstadoVentana(!estadoVentana)
    }

   


        return (


            <div> 
                a ver si abre esta mierda
    

    <Button color="success" onClick={abrirModal} >Mostrar Modal</Button>

    <Modal isOpen={estadoVentana}>
        <ModalHeader>
            Iniciar Sesion
        </ModalHeader>

        <ModalBody>
            <FormGroup>
                <Label for="usuario">Usuario</Label>
                <Input type="text" id="usuario" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Contraseña</Label>
                <Input type="password" id="password" />
            </FormGroup>
        </ModalBody>

        <ModalFooter>
            <Button color="primary">Iniciar Sesion</Button>
            <Button color="secondary" onClick={abrirModal}>Cerrrar </Button>
        </ModalFooter>
    </Modal>

    <Modal> 

            <ModalHeader>

            </ModalHeader>

            <ModalBody>

            </ModalBody>

            <ModalFooter>

            </ModalFooter>

    </Modal>

</div>

    )
 }
export default Pruebamodal

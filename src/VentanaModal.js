import React from 'react'
import { Button, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'




class VentanaModal extends React.Component {

    state={
        abierto: false,
    }

    //metodo para que cuando se aprieta el boton se cambie a true el estado abierto y se muestre el modal
    abrirModal = () =>{
        this.setState({abierto: !this.state.abierto})
    }



    render() {
        const modalStyle={
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }
    
        return (
            <>
                <Button color="success" onClick={this.abrirModal}>Mostrar Modal</Button>

                <Modal isOpen={this.state.abierto} style={modalStyle}>
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
                        <Button color="secondary" onClick={this.abrirModal}>Cerrrar </Button>
                    </ModalFooter>
                </Modal>

            </>
        )
    }
}


export default VentanaModal;
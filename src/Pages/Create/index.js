import React, { useEffect, useState } from "react";
import { FormGroup } from "reactstrap";
import { Col, Form, Label, Input, Button } from "reactstrap";
import firebase from "../../Lib/firebase"; 
import {storage} from "../../Lib/firebase";



const Create = () => {
    // crear función para obtener la información del formulario a través de un estado.
    const [ informacionFormulario, setInformacionFormulario] = useState({})
    // crear función para obtener la información de la imagen
    const [ archivo, setArchivo] = useState(null)
    // varibales que contiene la conexión de la base de datos y la referencia con la colección creada
    const basedatos = firebase.database()
    const refEntradas = basedatos.ref('/Entradas')
    const refAlmacen = storage.ref()

    // Usar función del estado useEffect para generar conexión con la base de datos.
    useEffect( () => {
        console.log("componente cargado")
        refEntradas.on('value', snapshot => {
            console.log( snapshot.val())
        })
    }, [])

    const manipuladorArchivo = event => {
      console.log(event.target.files)
      const archivo = event.target.files[0]
      console.log(archivo)
      setArchivo ( archivo )
    }
    // crear función que manipula a través de evento el cambio de información de un input.
    const changeHandler = event => {
        const atributo = event.target.name 
        const valor = event.target.value
        console.log (atributo, valor)
        setInformacionFormulario({...informacionFormulario,[atributo]:valor})
        
    }
    const guardarInformacion = () =>{
        console.log(informacionFormulario)
        let subirImagen = refAlmacen.child(`/imagenes/${archivo.name}`).put(archivo)
        subirImagen.on('state_changed', function(snapshot) {
          // crear varibale para progreso de de transmision de los bytes del archivo.
          var progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('La subida está en ' + progreso + '% de completada')
          
          switch(snapshot.state){
            case firebase.storage.TaskState.PAUSED: // o pausado
            console.log('Subida está pausada');
            break;

            case firebase.storage.TaskState.RUNNING: // o corriendo
            console.log('Subida está en proceso');
            break;
          }
        }, function(error){

        }, function(){
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          // Instrucción para obtener la URL de una imagen
          subirImagen.snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log('Archivo disponible en: ', downloadURL);
            refEntradas.push({...informacionFormulario,imagen:downloadURL})
          })
        })

        //refEntradas.push(informacionFormulario)
    }
  return (
    <Col xs="12">
      <h1>Crear</h1>
      <Form className="bg-dark my-3 rounded text-white p-3">
        <FormGroup>
          <label>Título</label>
          <Input name="titulo" onChange={ changeHandler }/>
        </FormGroup>
        <FormGroup>
          <label>Contenido</label>
          <Input name="contenido" onChange={ changeHandler }/>
        </FormGroup>
        <FormGroup>
          <label>Imagen</label>
          <Input type="file" name="imagen" onChange={ manipuladorArchivo }/>
        </FormGroup>
        <Button type="button" color="light" className="mt-3" onClick={ guardarInformacion }>Guardar</Button>
      </Form>
    </Col>
  );
};
export default Create;

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";



import { Col, Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import { useParams } from "react-router-dom";

const Detalle = () => {
    // hook del estado de la información de las entradas.
    const [contenidoEntrada, setContenidoEntrada] = useState({})

    // usar hook params para manipular los atributos de las colecciones en firebase
    const {id} = useParams()
    // varibales que contiene la conexión de la base de datos y la referencia con la colección creada
    const basedatos = firebase.database();
    // hook para realizar lectura en la base de datos.
    useEffect( () => {
        basedatos.ref(`/Entradas/${id}`).on( 'value', snapshot => {
            console.log(snapshot.val())
            // darle el contenido de la entrada en la colección de la base de datos, al arreglo del estado contenidoEntrada.
            setContenidoEntrada(snapshot.val())
        })
    },[])
    const {titulo, contenido, imagen} = contenidoEntrada
  return (
    <Col xs="12">
      <Card>
        <CardImg top width="100%" src={imagen} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{titulo}</CardTitle>
          <CardText>{contenido}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
};
export default Detalle;

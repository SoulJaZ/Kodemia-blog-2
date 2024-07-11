import React, { useEffect, useState } from "react";
import firebase from "../../Lib/firebase";
import ElementoContenidoCentral from "../../Components/ElementoContenidoCentral";
import {
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
  // hook para manejar el estado para el listado de entradas en la base de datos.
  const [listaEntradas, setListaEntradas] = useState([]);
  // varibales que contiene la conexión de la base de datos y la referencia con la colección creada
  const basedatos = firebase.database();
  const refEntradas = basedatos.ref("/Entradas");
  useEffect(() => {
    console.log("componente cargado");
    refEntradas.on("value", (snapshot) => {
      console.log(snapshot.val());
      setListaEntradas(snapshot.val());
    });
  }, []);
  return (
    <>
      <Col xs="12">
        <h1>Home</h1>
        <Row>
          {
            // instrucciones para recorrer la lista de entradas en la base de datos.
            Object.keys(listaEntradas).map((numeroEntrada) => {
              // instrucción que sirve para obtener el valor de los elementos de la lista, según su cual sea el número de la entrada.
              const informacionFormulario = listaEntradas[numeroEntrada];
              // variable que contiene los elementos de la lista
              const {titulo, contenido, imagen} = informacionFormulario
              return (
                <Col xs="12" md="3" key={numeroEntrada}>
                  <Card>
                    <CardImg top width="100%" src={imagen} alt="Card image cap" />
                    <CardBody>
                      <CardTitle tag="h5">{titulo}</CardTitle>
                      <CardText>{contenido}</CardText>
                      <Link to={`/detalle/${numeroEntrada}`}>
                        <Button>Ver detalle</Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          }
        </Row>
      </Col>
    </>
  );
};

export default Home;

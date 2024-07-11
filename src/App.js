import logo from "./logo.svg";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Row,
  NavbarText,
  Container,
} from "reactstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink as RouterNavLink,
} from "react-router-dom";
import React, { useState } from "react"; // hooks

import "./App.css";
import ElementoContenidoCentral from "./Components/ElementoContenidoCentral";
import rutas from "./Config/rutas";
import Create from "./Pages/Create";
import Home  from "./Pages/Home";
import Detalle from "./Pages/Details";



function App() {
  //hooks para crear estados, con una función para modificar el valor del estado que se está creando.
  const [titulo, setTitulo] = useState("Bienvenido!!!");
  // hook para manejar el estado de las entradas del blog
  const [entradasBlog, setEntradasBlog] = useState([
    {
      tituloEntrada: "Entrada 1",
      contenido:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. ",
      imagen:
        "https://jumpg-assets.tokyo-cdn.com/secure/title/200018/title_thumbnail_portrait_list/312841.jpg?hash=xqsWA9vMBdJnLjQH2ELoXQ&expires=2145884400",
    },
    {
      tituloEntrada: "Entrada 2",
      contenido:
        "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      imagen:
        "https://www.normaeditorial.com/upload/media/albumes/0001/19/f2962f988ff422ff0f0e52c0cce7fe061ae4fbe6.jpeg",
    },
    {
      tituloEntrada: "Entrada 3",
      contenido:
        "Lorem Ipsum is simplyages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      imagen: "https://otakuteca.com/images/books/cover/658c816be83be.webp",
    },
  ]);
  const [entrada, setEntrada] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // función para extraer valor de un input
  const changeHandler = (event) => {
    const value = event.target.value;
    const propiedades = event.target.name;
    setEntrada({ ...entrada, [propiedades]: value });
  };

  const guardarInformacion = () => {
    setEntradasBlog([...entradasBlog, entrada]);
  };
  //const titulo = "Bienvenidos a mi blog de Kodemia!";

  return (
    <div className="App">
      <Router>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">KodeBlog</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {rutas.rutas.map((rutas, index) => {
                const { label, path } = rutas;
                return (
                  <NavItem key={index}>
                    <RouterNavLink to={path} className="nav-link">
                      {label}
                    </RouterNavLink>
                  </NavItem>
                );
              })}
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>

        <Container>
          <Row>
            <Routes>
            <Route path="/detalle/:id" element={<Detalle />}/>
              <Route path="/create" element={<Create />}/>
              <Route path="/" element={<Home />}/>
            </Routes>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./helpers/icons/icomoon.css";

import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import logo from "./helpers/img/logo.png";
import { POST, PUT } from "./helpers/_Axion";
import Error404 from "./components/_Error404";
import Home from "./components/_Home";
import Users from "./components/_Users";
import Ubicacion from "./components/_Ubicacion";
import Cuarteleria from "./components/_Cuarteleria";
import Guardia from "./components/_Guardia";

//Constante que guardia en nombre de usuario, los permisos y una función para serrar sesión
export const Session = React.createContext({
  userName: "",
  authorities: [],
  cb: null,
});

const App = () => {
  const [session, setSession] = useState({
    login: null,
    userName: "",
    authorities: [],
  });

  useEffect(() => {
    handleScroll();
    handleLoad();
  }, []);

  //Comprueba si se encuentra el token de autenticación y si es asi comprueba en el servidor si este es valido para saver si estas autenticado
  function handleLoad() {
    let jwt = window.localStorage.getItem("jwt");
    if (jwt === null || jwt === undefined) {
      setSession({
        login: false,
        userName: "",
        authorities: [],
      });
      console.error("error al iniciar sesión");
    } else {
      PUT("/login", { jwt: jwt }, false)
        .then((response) => {
          let Jwt = require("jsonwebtoken");
          let data = Jwt.decode(jwt).sub.split(",");
          setSession({
            login: !response,
            userName: data.shift(),
            authorities: data,
          });
        })
        .catch((error) => {
          console.error("error al comprobar si estaba autenticado", error);
          setSession({
            login: false,
            userName: "",
            authorities: [],
          });
        });
    }
  }

  //Coge los datos del formulario de autenticación y los envía as servidor para validarlos y permitir el acceso a la aplicación mediante la gestión del jwt
  // y transform los datos del jwt en el userName , los roles y los pone en el estado
  function handleLogin(e) {
    e.preventDefault();
    POST(
      "/login",
      {
        userName: e.target.userName.value,
        password: e.target.password.value,
      },
      false
    )
      .then((response) => {
        window.localStorage.setItem("jwt", response.jwt);
        let Jwt = require("jsonwebtoken");
        let data = Jwt.decode(response.jwt).sub.split(",");
        setSession({
          login: true,
          userName: data.shift(),
          authorities: data,
        });
      })
      .catch((error) => console.error(error));
  }

  //Permite la salida de la aplicación mediante la elimination del jwt del storage y volviendo el estado a como estaba inicialmente
  function handleLogout() {
    window.localStorage.clear();
    setSession({
      login: false,
      userName: "",
      authorities: [],
    });
  }

  //Permite la animación del input de búsqueda cundo se hace el scroll en la aplicación
  function handleScroll() {
    let scroll = 0;
    document.addEventListener("scroll", () => {
      let filtro = document.getElementById("filtrar");
      if (window.scrollY < scroll && filtro !== null) {
        scroll = window.scrollY;
        filtro.classList.remove("d-none");
      }
      if (window.scrollY > scroll && filtro !== null) {
        scroll = window.scrollY;
        filtro.classList.add("d-none");
      }
    });
  }

  //Renderiza el formulario o la aplicación según el usuario esta autenticado o no
  //También esta implementada aquí el manejo de rutas
  if (session.login == null) {
    return null;
  } else if (!session.login) {
    document.getElementsByTagName("body")[0].classList.add("colorBodyLogin");
    return (
      <Container fluid className="centerLogin">
        <Row>
          <Col></Col>
          <Col
            xl="3"
            lg="4"
            md="5"
            sm="6"
            xs="9"
            className="shadow p-3 mb-5 bg-white rounded border colorLogin"
          >
            <Form onSubmit={handleLogin}>
              <Image src={logo} fluid className="mb-4" />
              <Form.Group>
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entre el Usuario"
                  id="userName"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Entre la Contraseña"
                  id="password"
                />
              </Form.Group>
              <Form.Group className="text-center">
                <Button variant="secondary" type="submit">
                  Entrar
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  } else {
    document.getElementsByTagName("body")[0].classList.remove("colorBodyLogin");
    return (
      <BrowserRouter>
        <Session.Provider
          value={{
            userName: session.userName,
            authorities: session.authorities,
            cb: handleLogout,
          }}
        >
          <Switch>
            <Redirect exact to="/home" from="/" />
            <Route exact path="/home" component={Home} />
            {!session.authorities.some(
              (a) =>
                a === "ADMINISTRADOR" ||
                a === "GESTION-USUARIOS" ||
                a === "MODIFICAR-USUARIOS" ||
                a === "BORRAR-USUARIOS" ||
                a === "AÑADIR-USUARIOS" ||
                a === "DAR-PERMISO-USUARIOS"
            ) ? null : (
              <Route exact path="/usuarios" component={Users} />
            )}
            {!session.authorities.some(
              (a) =>
                a === "ADMINISTRADOR" ||
                a === "GESTION-UBICACION-CUARTOS-PERSONAS" ||
                a === "GESTION-UBICACION" ||
                a === "AÑADIR-UBICACION" ||
                a === "MODIFICAR-UBICACION" ||
                a === "BORRAR-UBICACION" ||
                a === "GESTION-CUARTO" ||
                a === "AÑADIR-CUARTO" ||
                a === "MODIFICAR-CUARTO" ||
                a === "BORRAR-CUARTO" ||
                a === "GESTION-PERSONAS" ||
                a === "AÑADIR-PERSONAS" ||
                a === "BORRAR-PERSONAS"
            ) ? null : (
              <Route exact path="/ubicacion" component={Ubicacion} />
            )}
            {!session.authorities.some(
              (a) =>
                a === "ADMINISTRADOR" ||
                a === "GESTION-CUARTELERIA" ||
                a === "AÑADIR-CUARTELERIA" ||
                a === "MODIFICAR-CUARTELERIA" ||
                a === "BORRAR-CUARTELERIA" ||
                a === "GESTION-INCIDENCIA"
            ) ? null : (
              <Route exact path="/cuarteleria" component={Cuarteleria} />
            )}
            {!session.authorities.some(
              (a) =>
                a === "ADMINISTRADOR" ||
                a === "GESTION-GUARDIA-INTEGRANTES" ||
                a === "GESTION-GUARDIA" ||
                a === "AÑADIR-GUARDIA" ||
                a === "MODIFICAR-GUARDIA" ||
                a === "BORRAR-GUARDIA" ||
                a === "GESTION-INTEGRANTES" ||
                a === "AÑADIR-INTEGRANTES" ||
                a === "MODIFICAR-INTEGRANTES" ||
                a === "BORRAR-INTEGRANTES"
            ) ? null : (
              <Route exact path="/guardia" component={Guardia} />
            )}
            <Route exact component={Error404} />
          </Switch>
        </Session.Provider>
      </BrowserRouter>
    );
  }
};

export default App;

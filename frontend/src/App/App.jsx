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
      PUT("/login", { jwt: jwt })
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

  function handleLogin(e) {
    e.preventDefault();
    POST("/login", {
      userName: e.target.userName.value,
      password: e.target.password.value,
    })
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

  function handleLogout() {
    window.localStorage.clear();
    setSession({
      login: false,
      userName: "",
      authorities: [],
    });
  }

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
            <Route exact path="/usuarios" component={Users} />
            <Route exact component={Error404} />
          </Switch>
        </Session.Provider>
      </BrowserRouter>
    );
  }
};

export default App;

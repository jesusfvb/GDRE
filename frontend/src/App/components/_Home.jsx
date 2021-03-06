import React from "react";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import NavBar from "./_NavBar";
import cuarteleria from "../helpers/img/cuarteleria.jpg";
import guardia from "../helpers/img/guardia.jpg";
import ubicacion from "../helpers/img/ubicacion.jpg";
import { Session } from "../App";

const Home = () => {
  let body = document.getElementsByTagName("body")[0];
  body.classList.remove("colorBodyError404");
  body.classList.add("colorBody");
  return (
    <Container fluid>
      <Row>
        <Col className="p-0">
          <NavBar />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="mt-5">
          <Row className="mt-1">
            <Col></Col>
            <Col xl="11" lg="11" md="10" sm="12" xs="11">
              <Session.Consumer>
                {(session) => (
                  <Row>
                    {!session.authorities.some(
                      (a) =>
                        a === "ADMINISTRADOR" ||
                        a === "GESTION-CUARTELERIA" ||
                        a === "AÑADIR-CUARTELERIA" ||
                        a === "MODIFICAR-CUARTELERIA" ||
                        a === "BORRAR-CUARTELERIA" ||
                        a === "GESTION-INCIDENCIA"
                    ) ? null : (
                      <Col
                        className="mt-4 mb-4"
                        xl="3"
                        lg="4"
                        md="6"
                        sm="6"
                        xs="10"
                      >
                        <Card style={{ width: "18rem" }} className="shadow">
                          <Card.Img variant="top" src={cuarteleria} />
                          <Card.Body className="text-center">
                            <Card.Title>Cuartelería</Card.Title>
                            <Button
                              as={Link}
                              to="/cuarteleria"
                              variant="primary"
                            >
                              Acceder
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
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
                      <Col
                        className="mt-4 mb-4"
                        xl="3"
                        lg="4"
                        md="6"
                        sm="6"
                        xs="10"
                      >
                        <Card style={{ width: "18rem" }} className="shadow">
                          <Card.Img variant="top" src={guardia} />
                          <Card.Body className="text-center">
                            <Card.Title>Guardia</Card.Title>
                            <Button as={Link} to="/guardia" variant="primary">
                              Acceder
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
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
                      <Col
                        className="mt-4 mb-4"
                        xl="3"
                        lg="4"
                        md="6"
                        sm="6"
                        xs="10"
                      >
                        <Card style={{ width: "18rem" }} className="shadow">
                          <Card.Img variant="top" src={ubicacion} />
                          <Card.Body className="text-center">
                            <Card.Title>Ubicación</Card.Title>
                            <Button as={Link} to="/ubicacion" variant="primary">
                              Acceder
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                    {!session.authorities.some(
                      (a) =>
                        a === "ADMINISTRADOR" ||
                        a === "GESTION-USUARIOS" ||
                        a === "MODIFICAR-USUARIOS" ||
                        a === "BORRAR-USUARIOS" ||
                        a === "AÑADIR-USUARIOS" ||
                        a === "DAR-PERMISO-USUARIOS"
                    ) ? null : (
                      <Col
                        className="mt-4 mb-4"
                        xl="3"
                        lg="4"
                        md="6"
                        sm="6"
                        xs="10"
                      >
                        <Card style={{ width: "18rem" }} className="shadow">
                          <i
                            className="icon-android-people ml-3"
                            style={{ fontSize: 257 }}
                          ></i>
                          <Card.Body className="text-center">
                            <Card.Title>Usuarios</Card.Title>
                            <Button as={Link} to="/usuarios" variant="primary">
                              Acceder
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                  </Row>
                )}
              </Session.Consumer>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;

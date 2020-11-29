import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import NavBar from "./_NavBar";
import cuarteleria from "../helpers/img/cuarteleria.jpg";
import guardia from "../helpers/img/guardia.jpg";
import ubicacion from "../helpers/img/ubicacion.jpg";
import { Link } from "react-router-dom";

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
              <Row>
                <Col className="mt-4 mb-4" xl="3" lg="4" md="6" sm="6" xs="10">
                  <Card style={{ width: "18rem" }} className="shadow">
                    <Card.Img variant="top" src={cuarteleria} />
                    <Card.Body className="text-center">
                      <Card.Title>Cuartelería</Card.Title>
                      <Button as={Link} to="/cuarteleria" variant="primary">
                        Acceder
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col className="mt-4 mb-4" xl="3" lg="4" md="6" sm="6" xs="10">
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
                <Col className="mt-4 mb-4" xl="3" lg="4" md="6" sm="6" xs="10">
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
                <Col className="mt-4 mb-4" xl="3" lg="4" md="6" sm="6" xs="10">
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
              </Row>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;

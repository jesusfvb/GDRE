import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import NavBar from "./_NavBar";

const Home = ({ userName, handleLogout }) => {
  let body = document.getElementsByTagName("body")[0];
  body.classList.remove("colorBodyError404");
  body.classList.add("colorBody");
  return (
    <Container fluid>
      <Row>
        <Col className="p-0">
          <NavBar userName={userName} handleLogout={handleLogout} />
        </Col>
      </Row>
      <Row>
        <Col>Page</Col>
      </Row>
    </Container>
  );
};
export default Home;

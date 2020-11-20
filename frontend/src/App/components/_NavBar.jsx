import React from "react";
import { Col, Dropdown, Image, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import logo from "../helpers/img/logo.png";

const NavBar = ({ userName, handleLogout }) => {
  return (
    <Row className="colorNavbar m-0 shadow border fixed-top">
      <Col className="p-0" xl="2" lg="3" md="4" sm="6" xs="7">
        <Image src={logo} width="200" className="mb-1 mt-1" />
      </Col>
      <Col className="p-0">
        <Navbar className=" colorNavbar p-0 mt-1" expand="md">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link as={NavLink} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cuarteleria">
                Cuartelería
              </Nav.Link>
              <Nav.Link as={NavLink} to="/guardia">
                Guardia
              </Nav.Link>
              <Nav.Link as={NavLink} to="/ubicacion">
                Ubicación
              </Nav.Link>
              <Nav.Link as={NavLink} to="/usuarios">
                Usuarios
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
      <Col className="clearfix p-0" xl="2" lg="2" md="2" sm="2" xs="2">
        <Dropdown className="float-right mt-1 mb-1 mr-1">
          <Dropdown.Toggle
            variant="outline-dark"
            className="border border-white"
          >
            {userName}
          </Dropdown.Toggle>
          <Dropdown.Menu className="salir">
            <Dropdown.Item onClick={() => handleLogout()} className="p-0 pl-2 pr-2"> <i className="icon-power3"></i> Salir</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};
export default NavBar;

import React, { useState } from "react";
import { Link, Route, Router } from "wouter";
import { Navbar, Nav } from "react-bootstrap";
import Forex from "./Forex";
import TopGainesLosers from "./TopGainesLoser";
import NewLetter from "./NewLetter";
import GlobalQuotes from "./GlobalQuotes";
import AnnualQuarterlyEarnings from "./AnnualQuarterlyEarnings";
import Banner from "./Banner";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import NavDropdown from "react-bootstrap/NavDropdown";
//import Offcanvas from "react-bootstrap/Offcanvas";

const Home = () => {
  return (
    <div className="home">
      <CustomNavBar />
      <Banner />
      <Router>
        <Route path="/Forex" component={Forex} />
        <Route path="/top-gaines-losers" component={TopGainesLosers} />
        <Route path="/" component={NewLetter} />
        <Route path="/GlobalQuotes" component={GlobalQuotes} />
        <Route
          path="/AnnualQuarterlyEarnings"
          component={AnnualQuarterlyEarnings}
        />
      </Router>
    </div>
  );
};

const CustomNavBar = () => {
  const [expand, setExpand] = useState(false);

  const handleToggle = () => {
    setExpand(!expand);
  };
  return (
    <Navbar
      expand={expand}
      className="bg-body-dark mb-3"
      variant="dark"
      fixed="top"
      bg="dark" // Agregar el color de fondo negro

      //Hacer que la barra sea estática
    >
      <Container fluid bg="dark">
        <Navbar.Brand as={Link} to="/NewsLetter">
          News Letter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggle} />
        <Navbar.Offcanvas
          show={expand}
          onHide={() => setExpand(false)}
          placement="end"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Navegar</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                as={Link}
                to="/Forex"
                className="nav-link"
                onClick={() => setExpand(false)}
              >
                Forex
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/top-gaines-losers"
                className="nav-link"
                onClick={() => setExpand(false)}
              >
                Top Gainers/Losers
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/AnnualQuarterlyEarnings"
                className="nav-link"
                onClick={() => setExpand(false)}
              >
                Annual Quarterly Earnings
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/GlobalQuotes"
                className="nav-link"
                onClick={() => setExpand(false)}
              >
                Global Quote
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Home;

import React from "react";
import { Link, Route, Router } from "wouter";
import { Navbar, Nav } from "react-bootstrap";
import Forex from "./Forex";
import TopGainesLosers from "./TopGainesLoser";
import NewLetter from "./NewLetter";
//import "./Home.css"; // Importa el archivo CSS

const Home = () => {
  return (
    <div className="home">
      <NavBar />
      <NewLetter />
      <Router>
        <Route path="/Forex" component={Forex} />
        <Route path="/top-gaines-losers" component={TopGainesLosers} />
      </Router>
    </div>
  );
};

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Navbar.Brand href="/">Forex App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} href="/Forex" className="nav-link">
            Forex
          </Nav.Link>
          <Nav.Link as={Link} href="/top-gaines-losers" className="nav-link">
            Top Gainers/Losers
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Home;

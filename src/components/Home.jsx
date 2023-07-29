import React from "react";
import { Link, Route, Router } from "wouter";
import { Navbar, Nav } from "react-bootstrap";
import Forex from "./Forex";
import TopGainesLosers from "./TopGainesLoser";
import NewLetter from "./NewLetter";
import GlobalQuotes from "./GlobalQuotes";
import AnnualQuarterlyEarnings from "./AnnualQuarterlyEarnings";
//import "./Home.css"; // Importa el archivo CSS

const Home = () => {
  return (
    <div className="home">
      <NavBar />
      <Router>
        <Route path="/Forex" component={Forex} />
        <Route path="/top-gaines-losers" component={TopGainesLosers} />
        <Route path="/NewsLetter" component={NewLetter} />
        <Route path="/GlobalQuotes" component={GlobalQuotes} />
        <Route
          path="/AnnualQuarterlyEarnings"
          component={AnnualQuarterlyEarnings}
        />
      </Router>
    </div>
  );
};

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Navbar.Brand href="/NewsLetter">Forex </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} href="/Forex" className="nav-link">
            Forex
          </Nav.Link>
          <Nav.Link as={Link} href="/top-gaines-losers" className="nav-link">
            Top Gainers/Losers
          </Nav.Link>
          <Nav.Link as={Link} href="/GlobalQuotes" className="nav-link">
            Global Quote
          </Nav.Link>
          <Nav.Link
            as={Link}
            href="/AnnualQuarterlyEarnings"
            className="nav-link"
          >
            Annual Quarterly Earnings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Home;

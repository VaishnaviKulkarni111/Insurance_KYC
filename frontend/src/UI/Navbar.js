import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const UserNavbar = () => {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          Insurance KYC
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 justify-content-center">
            <Nav.Link href="/user-board" className="text-white fw-bold">
              Dashboard
            </Nav.Link>
            <Nav.Link href="/upload" className="text-white fw-bold">
              Upload
            </Nav.Link>
            <Nav.Link href="/policy" className="text-white fw-bold">
              Policies
            </Nav.Link>
            <Nav.Link href="/verify" className="text-white fw-bold">
              Verify
            </Nav.Link>
          </Nav>

          {/* Logout Button */}
          <Button variant="outline-light" onClick={logOut}  className="fw-bold">
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;

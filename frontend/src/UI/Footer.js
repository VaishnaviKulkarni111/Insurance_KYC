import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Footer =() =>{
    return(
        <footer className="bg-dark text-white py-5">
  <Container>
    <Row>
      {/* About Section */}
      <Col md={4} className="mb-3">
        <h5>About Us</h5>
        <p>
          We are a trusted platform offering fast and secure insurance
          onboarding solutions. Our mission is to simplify the insurance
          process for everyone.
        </p>
      </Col>

      {/* Quick Links Section */}
      <Col md={4} className="mb-3">
        <h5>Quick Links</h5>
        <ul className="list-unstyled">
          <li>
            <a href="/about" className="text-white text-decoration-none">
              About Us
            </a>
          </li>
          <li>
            <a href="/services" className="text-white text-decoration-none">
              Services
            </a>
          </li>
          <li>
            <a href="/contact" className="text-white text-decoration-none">
              Contact Us
            </a>
          </li>
          <li>
            <a href="/privacy" className="text-white text-decoration-none">
              Privacy Policy
            </a>
          </li>
        </ul>
      </Col>

      {/* Contact Section */}
      <Col md={4} className="mb-3">
        <h5>Contact Us</h5>
        <p>
          <i className="bi bi-geo-alt-fill me-2"></i>123 Insurance Lane, New
          York, NY 10001
        </p>
        <p>
          <i className="bi bi-telephone-fill me-2"></i>+1 (123) 456-7890
        </p>
        <p>
          <i className="bi bi-envelope-fill me-2"></i>
          <a href="mailto:support@insurance.com" className="text-white text-decoration-none">
            support@insurance.com
          </a>
        </p>
      </Col>
    </Row>

    <hr className="bg-white" />

    <Row className="align-items-center">
      {/* Social Media Links */}
      <Col md={6} className="mb-3 mb-md-0">
        <h5>Follow Us</h5>
        <div>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white me-3"
          >
            <i className="bi bi-facebook fs-4"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white me-3"
          >
            <i className="bi bi-twitter fs-4"></i>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white me-3"
          >
            <i className="bi bi-linkedin fs-4"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <i className="bi bi-instagram fs-4"></i>
          </a>
        </div>
      </Col>

      {/* Copyright Section */}
      <Col md={6} className="text-md-end text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} VK's Insurance Company. All rights
          reserved.
        </p>
      </Col>
    </Row>
  </Container>
</footer>

    )
}


export default Footer
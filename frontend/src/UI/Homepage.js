import React from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { FaLock, FaBolt, FaHeadset } from "react-icons/fa";

import Partners from "./Partners";
import Footer from "./Footer";
import Products from "./Products";
import Statistics from "./Statistics";
import PolicyInsights from "./PolicyInsights";
import Actions from "./Actions";
const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
     <header className="py-4">
  <Container>
    <Row className="align-items-center">
      {/* Logo Section */}
      <Col xs={12} sm={4}>
        <img
          src="https://res.cloudinary.com/zenbusiness/q_auto/v1/logaster/logaster-2020-08-h-encova-14.png"
          alt="Company Logo"
          style={{ height: "50px" }}
        />
      </Col>

      {/* Navigation Links */}
      <Col xs={12} sm={4} className="text-center">
        <nav>
          <a
            href="#about"
            style={{
              textDecoration: "none",
              color: "#007bff",
              margin: "0 15px",
              fontWeight: "bold",
            }}
          >
            About
          </a>
          <a
            href="#contact"
            style={{
              textDecoration: "none",
              color: "#007bff",
              margin: "0 15px",
              fontWeight: "bold",
            }}
          >
            Contact Us
          </a>
          <a
            href="#contact"
            style={{
              textDecoration: "none",
              color: "#007bff",
              margin: "0 15px",
              fontWeight: "bold",
            }}
          >
             Try Premium ✦
          </a>
        </nav>
      </Col>

      {/* Login and Register Buttons */}
      <Col xs={12} sm={4} className="text-right">
        <Button variant="primary" className="me-3" href="/auth">
          Login
        </Button>
        <Button variant="outline-primary" href="/auth">
          Register
        </Button>
      </Col>
    </Row>
  </Container>
</header>


      <section className="py-5">
        <Container>
          <Row className="align-items-center">
          <Col md={6}>
          <h1
  className="display-4 font-weight-bold text-primary"
  style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem" }}
>
  Secure Your Future Today!
</h1>

  <p className="lead text-dark mb-4">
    Experience the fastest and most secure way to get insured. Our platform 
    simplifies the KYC process, helping you access personalized policies 
    in just a few clicks.
  </p>
  <ul className="list-unstyled text-muted mb-4">
    <li><strong>✔️</strong> Instant KYC Verification</li>
    <li><strong>✔️</strong> Hassle-Free Documentation</li>
    <li><strong>✔️</strong> Real-Time Policy Updates</li>
  </ul>
  <Button variant="success" size="lg" className="me-3" href="/auth">
    Get Started
  </Button>
  <Button variant="outline-success" size="lg" href="#learn-more">
    Learn More
  </Button>
</Col>

            <Col md={6}>
              <Image src="https://www.hdfclife.com/content/dam/hdfclifeinsurancecompany/knowledge-center/images/about-life-insurance/difference-between-life-and-health-insurance.jpg" fluid alt="KYC Process" />
            </Col>
          </Row>
        </Container>
      </section>
      <Actions />
      <Products />

      <Statistics />
      <PolicyInsights /> 

      <Partners />



<section className="bg-light py-5">
  <Container>
    <h2 className="text-center mb-4">Why Choose Us?</h2>
    <Row>
      <Col sm={4} className="mb-4">
        <Card className="shadow-sm border-light text-center">
          <Card.Body>
            <FaLock style={{ fontSize: "2.5rem", color: "#17a2b8", marginBottom: "1rem" }} />
            <h5 className="card-title">Secure & Private</h5>
            <p className="card-text">
              We take your privacy seriously, ensuring that your personal
              data is always encrypted and protected.
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={4} className="mb-4">
        <Card className="shadow-sm border-light text-center">
          <Card.Body>
            <FaBolt style={{ fontSize: "2.5rem", color: "#ffc107", marginBottom: "1rem" }} />
            <h5 className="card-title">Fast Processing</h5>
            <p className="card-text">
              Our KYC process is fast, with real-time document verification
              ensuring a seamless experience for you.
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={4} className="mb-4">
        <Card className="shadow-sm border-light text-center">
          <Card.Body>
            <FaHeadset style={{ fontSize: "2.5rem", color: "#28a745", marginBottom: "1rem" }} />
            <h5 className="card-title">24/7 Support</h5>
            <p className="card-text">
              Our support team is available around the clock to assist you
              with any questions or issues you may have.
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</section>


      <Footer/>
    </div>
  );
};

export default HomePage;

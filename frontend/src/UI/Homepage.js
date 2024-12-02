import React from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <header className="py-4">
        <Container>
          <Row>
            <Col xs={12} sm={6}>
              <img src="https://play-lh.googleusercontent.com/C-lJxz2nVLL8vBli0TXRYMTR4H3X58WaFtdxF7EgYZAVzSJ90D69hFFHtKBoAmnhUopW" alt="Company Logo" style={{ height: "50px" }} />
            </Col>
            <Col xs={12} sm={6} className="text-right">
              <Button variant="primary" className="mr-2">
                Login
              </Button>
              <Button variant="outline-primary">Register</Button>
            </Col>
          </Row>
        </Container>
      </header>

      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 font-weight-bold">
                Fast and Secure Insurance Onboarding
              </h1>
              <p className="lead text-muted">
                Our platform streamlines the KYC process, making your journey to
                securing insurance smooth and hassle-free. Get verified in minutes
                and access your policy.
              </p>
              <Button variant="primary" size="lg" href="/auth">
                Start Your Onboarding
              </Button>
            </Col>
            <Col md={6}>
              <Image src="https://s3.ap-southeast-1.amazonaws.com/images.asianage.com/images/aa-Cover-u0b349upqugfio195s4lpk8144-20190502143949.Medi.jpeg" fluid alt="KYC Process" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">Why Choose Us?</h2>
          <Row>
            <Col sm={4} className="mb-4">
              <Card className="shadow-sm border-light">
                <Card.Body>
                  <h5 className="card-title">Secure & Private</h5>
                  <p className="card-text">
                    We take your privacy seriously, ensuring that your personal
                    data is always encrypted and protected.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4} className="mb-4">
              <Card className="shadow-sm border-light">
                <Card.Body>
                  <h5 className="card-title">Fast Processing</h5>
                  <p className="card-text">
                    Our KYC process is fast, with real-time document verification
                    ensuring a seamless experience for you.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4} className="mb-4">
              <Card className="shadow-sm border-light">
                <Card.Body>
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

      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col className="text-center">
              <p>&copy; {new Date().getFullYear()} Your Insurance Company</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;

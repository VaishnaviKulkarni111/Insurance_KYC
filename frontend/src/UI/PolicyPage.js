import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
 import './Policy.css';

const PolicyPage = () => {
  return (
    <div>
      {/* Section 1 */}
      <section className="section section-blue section-shiny">
        <Container className="text-center py-5">
          <Row>
            <Col md={6} className="d-flex align-items-center">
              <div>
                <h1>Welcome to Our Policies</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in massa id lacus lacinia vehicula.</p>
              </div>
            </Col>
            <Col md={6}>
              <Image src="https://www.policybachat.com/ArticlesImages/450.webp" fluid alt="Policies" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section 2 */}
      <section className="section section-gray">
        <Container className="text-center py-5">
          <Row>
            <Col md={6}>
              <Image src="https://kbcells.com/wp-content/uploads/2024/09/family-floater-health-insurance.png" fluid alt="Privacy Policy" />
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <div>
                <h1>Privacy Policy</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at quam sed magna euismod tincidunt.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section 3 */}
      <section className="section section-green">
        <Container className="text-center py-5">
          <Row>
            <Col md={6} className="d-flex align-items-center">
              <div>
                <h1>Business insurance</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor nisl id lacus consectetur varius.</p>
              </div>
            </Col>
            <Col md={6}>
              <Image src="https://www.financestrategists.com/uploads/Benefits_and_Risks_of_Business_Insurance.png" fluid alt="Terms" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section 4 */}
      <section className="section section-orange">
        <Container className="text-center py-5">
          <Row>
            <Col md={6}>
              <Image src="https://www.policybachat.com/ArticlesImages/1348.jpg" fluid alt="FAQs" />
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <div>
                <h1> Car Insurance</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt tortor vel leo tincidunt, nec varius ligula tempor.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default PolicyPage;

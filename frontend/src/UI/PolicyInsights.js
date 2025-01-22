import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PolicyInsights = () => {
  return (
    <div style={{ backgroundColor: "#f9fbfd", minHeight: "100vh" }}>

      {/* Info Section */}
      <section style={{ backgroundColor: "#eaf4ff",  padding: "60px 20px" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
            <h2 className="text-center mb-4">Policy Journey Timeline</h2>
          <div className="timeline text-center">
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h5>Step 1: Choose Your Plan</h5>
                <p>
                  Explore policies that match your financial goals and needs.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h5>Step 2: Submit KYC</h5>
                <p>Upload documents for identity verification.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h5>Step 3: Policy Activation</h5>
                <p>Complete payment and start your secure journey.</p>
              </div>
            </div>
          </div>
            </Col>
            <Col md={6}>
              <h2>Did You Know?</h2>
              <p className="text-muted">
                Policies provide not just security but also financial planning
                opportunities. For instance:
              </p>
              <ul>
                <li>
                  A term plan can secure your family’s future at just ₹20/day.
                </li>
                <li>
                  Savings plans offer a guaranteed return of up to 6% annually.
                </li>
                <li>
                  Retirement plans ensure financial independence post-retirement.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <Container style={{
          color: "#4da3ff",
          padding: "30px 10px",
          textAlign: "center",
        }}>
          <h2>Ready to Secure Your Future?</h2>
          <p>
            Start exploring plans that suit your needs and goals. Take the first
            step today!
          </p>
          <button
            style={{
              backgroundColor: "#fff",
              color: "#4da3ff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Explore Plans
          </button>
        </Container>
      </section>

    </div>
  );
};

export default PolicyInsights;

import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const policies = [
  {
    amount: "₹1 Crore",
    type: "Life Cover",
    plan: "Starting from ₹16/day",
    bgColor: "#ffd8d9",
    textColor: "#a73740",
  },
  {
    amount: "₹50 Lakh",
    type: "Health Cover",
    plan: "Starting from ₹10/day",
    bgColor: "#d9d8f6",
    textColor: "#5d50d8",
  },
  {
    amount: "₹25 Lakh",
    type: "Car Insurance",
    plan: "Starting from ₹8/day",
    bgColor: "#ffdea3",
    textColor: "#7f5900",
  },
  {
    amount: "₹75 Lakh",
    type: "Travel Insurance",
    plan: "Starting from ₹12/day",
    bgColor: "#d9f6e8",
    textColor: "#3b6e5a",
  },
];

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleUploadNavigation = () => {
    navigate("/upload"); // Navigate to the upload page
  };

  return (
    <Container className="mt-5 py-5">
      {/* Dashboard Header */}
      <Row>
        <Col>
          <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>
        </Col>
      </Row>

      {/* Status and Notifications */}
      <Row className="mb-4">
        <Col md={8}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Application Status</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>KYC Status:</strong> Pending
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Document Submission:</strong> Not Started
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Policy Status:</strong> Under Review
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Notifications</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Welcome to the Insurance Portal!</ListGroup.Item>
                <ListGroup.Item>Your KYC verification is pending.</ListGroup.Item>
                <ListGroup.Item>Submit documents to proceed.</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upload Documents Section */}
      <Row>
        <Col>
          <Card className="shadow-sm mb-5">
            <Card.Body>
              <Card.Text>
                Ensure all your personal and financial documents are ready. You
                can upload them by clicking the button below.
              </Card.Text>
              <Button
                variant="primary"
                size="lg"
                className="w-100"
                onClick={handleUploadNavigation}
              >
                Upload Documents
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Policies Section */}
      <h2 className="text-center mb-4">Available Policies</h2>
      <Row className="g-4">
        {policies.map((policy, index) => (
          <Col md={3} key={index}>
            <div
              style={{
                backgroundColor: policy.bgColor,
                color: policy.textColor,
                borderRadius: "8px",
                padding: "20px",
                textAlign: "left",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  margin: "0 0 10px",
                }}
              >
                {policy.amount}
              </p>
              <p style={{ fontSize: "1.1rem", margin: "0 0 10px" }}>
                {policy.type}
              </p>
              <p style={{ fontSize: "0.9rem", margin: "0 0 20px" }}>
                {policy.plan}
              </p>
              <Button
                style={{
                  backgroundColor: policy.textColor,
                  borderColor: policy.textColor,
                  color: "#fff",
                }} href="/policy"
              >
                View Plan
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserDashboard;

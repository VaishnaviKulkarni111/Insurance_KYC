import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  const handleUploadNavigation = () => {
    navigate('/upload'); // Navigates to the upload page
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>
        </Col>
      </Row>
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
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Text>
                Ensure all your personal and financial documents are ready. You can upload them by clicking the button below.
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
    </Container>
  );
}

export default UserDashboard;

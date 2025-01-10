import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUsers, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  const goToUserList = () => {
    navigate('/userlist'); // Navigate to the User List page
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center" style={{ color: '#1e88e5' }}>
          Admin Dashboard
        </h2>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Row>
        <Col md={4}>
          <Card className="shadow text-center mb-4">
            <Card.Body>
              <FaUsers size={40} color="#1e88e5" className="mb-3" />
              <h5>Total Users</h5>
              <h3>150</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow text-center mb-4">
            <Card.Body>
              <FaCheckCircle size={40} color="green" className="mb-3" />
              <h5>Approved Applications</h5>
              <h3>100</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow text-center mb-4">
            <Card.Body>
              <FaHourglassHalf size={40} color="#ff9800" className="mb-3" />
              <h5>Pending Applications</h5>
              <h3>20</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="shadow text-center mb-4">
            <Card.Body>
              <h5>Recent Activity</h5>
              <p style={{ color: '#555' }}>Updated 5 applications today</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="text-center mt-4">
        <Button variant="primary" onClick={goToUserList}>
          View User List
        </Button>
      </div>
    </Container>
  );
};

export default Dashboard;

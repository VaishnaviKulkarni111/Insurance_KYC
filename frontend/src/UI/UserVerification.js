import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Spinner } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaMobileAlt, FaFileAlt } from 'react-icons/fa';

const UserVerification = ({ emailVerified, mobileVerified, documents, loading, handleResendEmail, handleResendSMS }) => {
  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#f9f9f9' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="text-center">Verification & Uploaded Documents</h4>
            </Card.Header>
            <Card.Body>
              {/* Verification Section */}
              <h5>Verification Status</h5>
              <hr />
              <Row>
                {/* Email Verification */}
                <Col md={6} className="mb-4">
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="d-flex align-items-center">
                      <FaEnvelope className="mr-3" style={{ fontSize: '1.8rem', color: '#1e88e5' }} />
                      <div>
                        <h6 className="mb-1">Email Verification</h6>
                        {emailVerified ? (
                          <Badge bg="success" className="px-3 py-2">
                            <FaCheckCircle className="mr-1" /> Verified
                          </Badge>
                        ) : (
                          <>
                            <Badge bg="danger" className="px-3 py-2 mb-2">
                              <FaTimesCircle className="mr-1" /> Not Verified
                            </Badge>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={handleResendEmail}
                              disabled={loading}
                            >
                              {loading ? <Spinner animation="border" size="sm" /> : 'Resend Email'}
                            </Button>
                          </>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Mobile Verification */}
                <Col md={6} className="mb-4">
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="d-flex align-items-center">
                      <FaMobileAlt className="mr-3" style={{ fontSize: '1.8rem', color: '#1e88e5' }} />
                      <div>
                        <h6 className="mb-1">Mobile Verification</h6>
                        {mobileVerified ? (
                          <Badge bg="success" className="px-3 py-2">
                            <FaCheckCircle className="mr-1" /> Verified
                          </Badge>
                        ) : (
                          <>
                            <Badge bg="danger" className="px-3 py-2 mb-2">
                              <FaTimesCircle className="mr-1" /> Not Verified
                            </Badge>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={handleResendSMS}
                              disabled={loading}
                            >
                              {loading ? <Spinner animation="border" size="sm" /> : 'Resend SMS'}
                            </Button>
                          </>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Uploaded Documents Section */}
              <h5 className="mt-4">Uploaded Documents</h5>
              <hr />
              {documents.length > 0 ? (
                <Row>
                  {documents.map((doc, index) => (
                    <Col md={6} key={index} className="mb-4">
                      <Card className="border-0 shadow-sm">
                        <Card.Body className="d-flex align-items-center">
                          <FaFileAlt className="mr-3" style={{ fontSize: '1.8rem', color: '#1e88e5' }} />
                          <div>
                            <h6 className="mb-1">Document {index + 1}</h6>
                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                              View Document
                            </a>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-muted">No documents uploaded yet.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserVerification;

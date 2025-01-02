import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Row, Col, Card, Badge, Button, Form, Spinner } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaMobileAlt, FaFileAlt } from 'react-icons/fa';
import { fetchUserDetails } from '../store/VerifySlice';

const UserVerification = ({  emailVerified, mobileVerified, documents, loading, handleResendEmail, handleResendSMS }) => {
  const { email, mobile, loading: userLoading, error } = useSelector((state) => state.verify);

  console.log("email", email)
 const dispatch = useDispatch();
   useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <Container fluid className="py-5 mt-4" style={{ backgroundColor: '#f9f9f9' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white text-center">
              <h4>Verification & Uploaded Documents</h4>
            </Card.Header>
            <Card.Body>
              {/* User Details */}
              <div className="mb-4">
                <h5 className="text-center">User Information</h5>
                <hr />
                <Row className="text-center">
                  <Col md={6} className="mb-3">
                    <FaEnvelope className="me-2" style={{ fontSize: '1.5rem', color: '#1e88e5' }} />
                    <span className="fw-bold">Email:</span> {email}
                  </Col>
                  <Col md={6} className="mb-3">
                    <FaMobileAlt className="me-2" style={{ fontSize: '1.5rem', color: '#1e88e5' }} />
                    <span className="fw-bold">Mobile:</span> {mobile}
                  </Col>
                </Row>
              </div>

              {/* Verification Status */}
              <div>
                <h5 className="text-center">Verification Status</h5>
                <hr />
                <Row>
                  {/* Email Verification */}
                  <Col md={6} className="mb-4">
                    <Card className="border-0 shadow-sm">
                      <Card.Body className="d-flex align-items-center">
                        <FaEnvelope className="me-3" style={{ fontSize: '1.8rem', color: '#1e88e5' }} />
                        <div>
                          <h6 className="mb-1">Email Verification</h6>
                          {emailVerified ? (
                            <Badge bg="success" className="px-3 py-2">
                              <FaCheckCircle className="me-1" /> Verified
                            </Badge>
                          ) : (
                            <>
                              <Badge bg="danger" className="px-3 py-2 mb-2">
                                <FaTimesCircle className="me-1" /> Not Verified
                              </Badge>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={handleResendEmail}
                                disabled={loading}
                                className="mt-2"
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
                        <FaMobileAlt className="me-3" style={{ fontSize: '1.8rem', color: '#1e88e5' }} />
                        <div>
                          <h6 className="mb-1">Mobile Verification</h6>
                          {mobileVerified ? (
                            <Badge bg="success" className="px-3 py-2">
                              <FaCheckCircle className="me-1" /> Verified
                            </Badge>
                          ) : (
                            <>
                              <Badge bg="danger" className="px-3 py-2 mb-2">
                                <FaTimesCircle className="me-1" /> Not Verified
                              </Badge>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={handleResendSMS}
                                disabled={loading}
                                className="mt-2"
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
              </div>

              {/* Uploaded Documents Section */}
              <div className="mt-4">
                <h5 className="text-center">Uploaded Documents</h5>
                <hr />
                {documents && documents.length > 0 ? (
                  <Row>
                    {documents.map((doc, index) => (
                      <Col md={6} key={index} className="mb-4">
                        <Card className="border-0 shadow-sm">
                          <Card.Body className="d-flex align-items-center">
                            <FaFileAlt className="me-3" style={{ fontSize: '1.8rem', color: '#1e88e5' }} />
                            <div>
                              <h6 className="mb-1">Document {index + 1}</h6>
                              <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary">
                                View Document
                              </a>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-muted text-center">No documents uploaded yet.</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserVerification;

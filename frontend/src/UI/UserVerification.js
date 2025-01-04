import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaMobileAlt, FaFileAlt } from 'react-icons/fa';
import { fetchUserDetails, sendVerificationEmail, sendOTP } from '../store/VerifySlice';

const UserVerification = ({ emailVerified, mobileVerified, documents, loading }) => {
  const { email, mobile, loading: userLoading, emailSent } = useSelector((state) => state.verify);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);  

  // Handle the email resend action
  const handleResendEmail = () => {
    dispatch(sendVerificationEmail());
  };

  const handleSendOTP = () =>{
    dispatch(sendOTP(mobile));
  }

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
                                disabled={userLoading || emailSent}
                                className="mt-2"
                              >
                                {userLoading ? <Spinner animation="border" size="sm" /> : emailSent ? 'Email Sent' : 'Resend Email'}
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
                                onClick={handleSendOTP}
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

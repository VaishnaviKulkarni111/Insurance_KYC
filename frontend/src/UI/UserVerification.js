import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Badge, Button, Spinner, Form } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaMobileAlt } from 'react-icons/fa';
import { fetchUserDetails, sendVerificationEmail,verifyEmail, sendOTP, verifyOtp, resetOtpVerification } from '../store/VerifySlice';
import { useParams } from 'react-router-dom';

const UserVerification = () => {
  const {
    email,
    mobile,
    emailVerified,
    mobileVerified,
    loading,
    emailSent,
    otpVerificationLoading,
    otpVerificationSuccess,
  } = useSelector((state) => state.verify);

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const dispatch = useDispatch();
  const { token } = useParams(); // Retrieve the email verification token from the URL

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);
 
  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (otpVerificationSuccess) {
      const timeout = setTimeout(() => {
        dispatch(resetOtpVerification());
      }, 3000); // Reset success message after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [otpVerificationSuccess, dispatch]);

  // Handle the email resend action
  const handleResendEmail = () => {
    dispatch(sendVerificationEmail());
  };

  const handleSendOTP = () => {
    dispatch(sendOTP(mobile));
    setOtpSent(true); // Set flag when OTP is sent
  };

  const handleVerifyOTP = () => {
    dispatch(verifyOtp({ mobile, otp }));
  };

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
                                disabled={loading || emailSent}
                                className="mt-2"
                              >
                                {loading ? (
                                  <Spinner animation="border" size="sm" />
                                ) : emailSent ? (
                                  'Email Sent'
                                ) : (
                                  'Resend Email'
                                )}
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
                              {!otpSent && (
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={handleSendOTP}
                                  disabled={loading}
                                  className="mt-2"
                                >
                                  {loading ? (
                                    <Spinner animation="border" size="sm" />
                                  ) : (
                                    'Resend SMS'
                                  )}
                                </Button>
                              )}
                              {otpSent && (
                                <div className="mt-3">
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="mb-2"
                                  />
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={handleVerifyOTP}
                                    disabled={otpVerificationLoading}
                                  >
                                    {otpVerificationLoading ? (
                                      <Spinner animation="border" size="sm" />
                                    ) : (
                                      'Verify OTP'
                                    )}
                                  </Button>
                                </div>
                              )}
                              {otpVerificationSuccess && (
                                <p className="text-success mt-2">OTP Verified Successfully!</p>
                              )}
                            </>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>

             
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserVerification;

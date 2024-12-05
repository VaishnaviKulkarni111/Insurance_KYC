import React from 'react';
import { FaUpload, FaFileImage, FaIdCard } from 'react-icons/fa';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

const UploadDocs = () => {
  return (
    <Container fluid className="p-0">
      {/* Pale Blue Background for Instructions */}
      <div className="bg-#e3f2fd py-5" style={{ backgroundColor: '#e3f2fd' }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center mb-4" style={{ fontWeight: '600', color: '#1e88e5' }}>
              Instructions for Uploading Documents
            </h2>
            <p className="justify-content-center" style={{ fontSize: '1.1rem', color: '#555' }}>
              Please upload the following documents to complete your KYC process:
              <ul style={{ fontSize: '1rem', color: '#555' }}>
                <li>Government-issued ID (e.g., Aadhar, Passport)</li>
                <li>Recent Photograph</li>
                <li>Any other necessary documents as requested</li>
              </ul>
              Ensure that the documents are clear and legible for verification.
            </p>
          </Col>
        </Row>
      </div>

      {/* Horizontal Line with Space Below */}
      <div style={{ borderBox: '3px solid #1e88e5', marginTop: '20px' }} />

      {/* Upload Form Section */}
      <div className="py-5" style={{ backgroundColor: '#fafafa' }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg p-4 rounded">
              <h3 className="text-center mb-4" style={{ color: '#1e88e5' }}>Upload Your Documents</h3>

              <Form>
                {/* ID Photo */}
                <Form.Group controlId="formFile" className="mb-4">
                  <Form.Label className="d-flex align-items-center" style={{ fontSize: '1.1rem', color: '#333' }}>
                    <FaFileImage className="mr-2" style={{ fontSize: '1.5rem', color: '#1e88e5' }} />
                    <span>Upload Your Photo</span>
                  </Form.Label>
                  <Form.Control type="file" className="form-control-lg" />
                </Form.Group>

                {/* PAN/Aadhar Card */}
                <Form.Group controlId="formFile" className="mb-4">
                  <Form.Label className="d-flex align-items-center" style={{ fontSize: '1.1rem', color: '#333' }}>
                    <FaIdCard className="mr-2" style={{ fontSize: '1.5rem', color: '#1e88e5' }} />
                    <span>Upload Your PAN or Aadhar Card</span>
                  </Form.Label>
                  <Form.Control type="file" className="form-control-lg" />
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100 py-3" style={{ fontSize: '1.1rem' }}>
                  <FaUpload className="mr-2" />
                  Upload Documents
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default UploadDocs;

import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile, fetchUploadedDocuments } from '../store/UploadSlice';
import { Button, Form, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaUpload, FaFileImage, FaIdCard, FaFileAlt } from 'react-icons/fa';
   
const UploadDocs = () => {
  const dispatch = useDispatch();
  const { loading, fileUrl, error, documents } = useSelector((state) => state.upload);
  console.log("documents for screen", documents)

  const [selectedFiles, setSelectedFiles] = useState({
    photo: null,
    idCard: null,
  });

  const handleFileChange = (e, type) => {
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [type]: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFiles.photo) {
      dispatch(uploadFile(selectedFiles.photo));
    }
    if (selectedFiles.idCard) {
      dispatch(uploadFile(selectedFiles.idCard));
    }
  };

  useEffect(() => {
    dispatch(fetchUploadedDocuments());
  }, [dispatch]);


  return (
    <Container fluid className="p-0">
      <div className="bg-light py-5" style={{ backgroundColor: '#e3f2fd' }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center mb-4" style={{ fontWeight: '600', color: '#1e88e5' }}>
              Instructions for Uploading Documents
            </h2>
            <div style={{ fontSize: '1.1rem', color: '#555' }}>
              <p>Please upload the following documents to complete your KYC process:</p>
              <ul>
                <li>Government-issued ID (e.g., Aadhar, Passport)</li>
                <li>Recent Photograph</li>
                <li>Any other necessary documents as requested</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ borderBottom: '3px solid #1e88e5', marginTop: '20px' }} />

      <div className="py-5" style={{ backgroundColor: '#fafafa' }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg p-4 rounded">
              <h3 className="text-center mb-4" style={{ color: '#1e88e5' }}>
                Upload Your Documents
              </h3>

              <Form onSubmit={handleSubmit}>
      {/* Photo Upload */}
      <Form.Group controlId="formFilePhoto" className="mb-4">
        <Form.Label className="d-flex align-items-center" style={{ fontSize: '1.1rem', color: '#333' }}>
          <span className="me-2">
            <FaFileImage style={{ fontSize: '1.5rem', color: '#1e88e5' }} />
          </span>
          Upload Your Photo
        </Form.Label>
        <Form.Control
          type="file"
           name="document"
          className="form-control-lg"
          onChange={(e) => handleFileChange(e, 'photo')}
        />
      </Form.Group>

      {/* ID Card Upload */}
      <Form.Group controlId="formFileIdCard" className="mb-4">
        <Form.Label className="d-flex align-items-center" style={{ fontSize: '1.1rem', color: '#333' }}>
          <span className="me-2">
            <FaIdCard style={{ fontSize: '1.5rem', color: '#1e88e5' }} />
          </span>
          Upload Your PAN or Aadhar Card
        </Form.Label>
        <Form.Control
          type="file"
           name="document"
          className="form-control-lg"
          onChange={(e) => handleFileChange(e, 'idCard')}
        />
      </Form.Group>

      {/* Submit Button */}
      <Button
        variant="primary"
        type="submit"
        className="w-100 py-3 d-flex align-items-center justify-content-center"
        style={{ fontSize: '1.1rem' }}
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Uploading...
          </>
        ) : (
          <>
            <FaUpload className="me-2" />
            Upload Documents
          </>
        )}
      </Button>
    </Form>

              {/* Error Message */}
              {error && <p className="text-danger text-center mt-3">{error}</p>}

              {/* Success Message */}
              {fileUrl && (
                <p className="text-success text-center mt-3">
                  File uploaded successfully! URL: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a>
                </p>
              )}
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
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary"
                              >
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
    </Container>
  );
};

export default UploadDocs;

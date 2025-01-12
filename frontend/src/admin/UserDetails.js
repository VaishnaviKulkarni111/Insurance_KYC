import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, fetchUserFiles, updateUserStatus } from '../store/AdminSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Table } from 'react-bootstrap';

const UserDetails = () => {
  const { userId } = useParams();
  console.log("userID", userId)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetails,userFiles, loading, error } = useSelector((state) => state.admin);
 console.log("userfiles in state",userFiles)
  useEffect(() => {
    dispatch(fetchUserDetails(userId));
    dispatch(fetchUserFiles(userId))
  }, [dispatch, userId]);

  const handleStatusUpdate = (status) => {
    const reason = status === 'Rejected' ? prompt('Please provide a reason for rejection:') : '';
    if (status === 'Rejected' && !reason) return; 
  
    dispatch(updateUserStatus({ userId, status, reason }));
  }

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 style={{ color: '#1e88e5' }}>User Details</h2>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="shadow mb-4">
            <Card.Body>
              <h5>User Information</h5>
              <Table>
                <tbody>
                  <tr>
                    <td><strong>Name</strong></td>
                    <td>{userDetails?.fname || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Email</strong></td>
                    <td>{userDetails?.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Mobile</strong></td>
                    <td>{userDetails?.mobile}</td>
                  </tr>
                  <tr>
                    <td><strong>Email Verified</strong></td>
                    <td>
                      <Badge bg={userDetails?.emailVerified ? 'success' : 'danger'}>
                        {userDetails?.emailVerified ? 'Verified' : 'Not Verified'}
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Mobile Verified</strong></td>
                    <td>
                      <Badge bg={userDetails?.mobileVerified ? 'success' : 'danger'}>
                        {userDetails?.mobileVerified ? 'Verified' : 'Not Verified'}
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Status</strong></td>
                    <td>{userDetails?.status || 'Pending'}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
         <Card className="shadow mb-4">
  <Card.Body>
    <h5>Uploaded Documents</h5>
    {userFiles && userFiles.length > 0 ? (  // Check if userFiles exists and is an array
      <ul>
        {userFiles.map((file, index) => (
          <li key={index}>
            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
              {file.fileName}
            </a> 
            <p>
              <small>Size: {(file.size / 1024).toFixed(2)} KB</small>
            </p>
            <p>
              <small>Uploaded: {new Date(file.lastModified).toLocaleString()}</small>
            </p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No documents uploaded</p>
    )}
  </Card.Body>
</Card>


<div className="d-flex justify-content-between mt-3">
  <Button
    variant="success"
    onClick={() => handleStatusUpdate('Approved')}
  >
    Approve
  </Button>
  <Button
    variant="danger"
    onClick={() => handleStatusUpdate('Rejected')}
  >
    Reject
  </Button>
</div>

        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;

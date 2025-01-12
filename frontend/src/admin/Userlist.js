import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../store/AdminSlice';
import { Container, Table, Button, Form, Row, Col, Spinner } from 'react-bootstrap';

const Userlist = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  console.log("users data in state", users)
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter users based on the email field
  const filteredUsers = users
    ? users.filter((user) => user.email.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col md={6}>
          <h2 style={{ color: '#1e88e5' }}>User List</h2>
        </Col>
        <Col md={6}>
          <Form>
            <Form.Control
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Table striped bordered hover className="shadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.email || 'N/A'}</td>
                <td>  <span
    className={`badge ${
      user.status === 'Approved'
        ? 'bg-success'
        : user.status === 'Rejected'
        ? 'bg-danger'
        : user.status === 'Pendind'
        ? 'bg-primary'
        : 'bg-warning'
    }`}
  >
    {user.status}
  </span></td>
                <td>
                  <Button as={Link} to={`/user-details/${user._id}`}
                   variant="primary" size="sm" 
                >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Userlist;

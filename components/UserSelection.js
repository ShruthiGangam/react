import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaUserMd, FaUserInjured, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (userType) => {
    navigate(`/common?userType=${userType}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Select User Type</h2>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <FaUserMd size={50} className="mb-3" />
              <Card.Title>Doctor</Card.Title>
              <Button variant="primary" onClick={() => handleSelection('doctor')}>
                Select
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <FaUserInjured size={50} className="mb-3" />
              <Card.Title>Patient</Card.Title>
              <Button variant="primary" onClick={() => handleSelection('patient')}>
                Select
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <FaUserShield size={50} className="mb-3" />
              <Card.Title>Admin</Card.Title>
              <Button variant="primary" onClick={() => handleSelection('admin')}>
                Select
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserSelection;
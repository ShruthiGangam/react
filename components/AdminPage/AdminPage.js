import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import PersonalInfo from './PersonalInfo';
import AppointmentList from './AppointmentList';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminPage = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('personalInfo');
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  const fetchAdminDetails = async () => {
    try {
      console.log("i am here")
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      setAdmin(response.data);
    } catch (error) {
      console.error('Error fetching admin details:', error);
      setError('Failed to fetch admin details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    fetchAdminDetails();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="text-center mb-4">
        <Button
          variant={activeView === 'personalInfo' ? 'primary' : 'outline-primary'}
          onClick={() => setActiveView('personalInfo')}
          className="me-2"
        >
          Personal Info
        </Button>
        <Button
          variant={activeView === 'appointments' ? 'primary' : 'outline-primary'}
          onClick={() => setActiveView('appointments')}
        >
          Appointments
        </Button>
      </div>

      <Row>
        <Col md={12}>
          {activeView === 'personalInfo' && admin && <PersonalInfo admin={admin} />}
          {activeView === 'appointments' && <AppointmentList />}
        </Col>
      </Row>

      <div className="text-center mt-4">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default AdminPage;
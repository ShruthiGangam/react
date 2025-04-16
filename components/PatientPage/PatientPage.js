import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import PersonalInfo from './PersonalInfo';
import Appointments from './Appointments';
import CreateAppointment from './CreateAppointment';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const PatientPage = () => {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('personalInfo');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const token = localStorage.getItem('token');
      
      // Fetch patient details
      const patientRes = await axios.get(`http://localhost:5000/patient/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatient(patientRes.data);

      // Fetch appointments
      const appointmentsRes = await axios.get(`http://localhost:5000/appointment/patient/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(appointmentsRes)
      setAppointments(appointmentsRes.data.appointments);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDeleteSuccess = () => {
    fetchData(); // Refresh the appointments list
    setSuccess('Appointment deleted successfully');
   
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

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Patient Dashboard</h2>

      {/* Success/Error Alerts */}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

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
          className="me-2"
        >
          Appointments
        </Button>
        <Button
          variant={activeView === 'createAppointment' ? 'primary' : 'outline-primary'}
          onClick={() => setActiveView('createAppointment')}
        >
          Create Appointment
        </Button>
      </div>

      <Row>
        <Col md={12}>
          {activeView === 'personalInfo' && patient && <PersonalInfo patient={patient} />}
          {activeView === 'appointments' && (
            <Appointments 
              appointments={appointments} 
              onDeleteSuccess={handleDeleteSuccess}
            />
          )}
          {activeView === 'createAppointment' && (
            <CreateAppointment 
              patientId={id} 
              onAppointmentCreated={() => {
                setSuccess('Appointment created successfully');
                fetchData();
                setActiveView('appointments');
              }} 
              onCancel={() => setActiveView('appointments')}
            />
          )}
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

export default PatientPage;
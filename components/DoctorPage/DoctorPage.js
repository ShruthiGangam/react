import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import PersonalInfo from './PersonalInfo';
import Appointments from './Appointments';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const DoctorPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('personalInfo'); // State to track active view
  const navigate = useNavigate();
  const location = useLocation(); // Access the location object
  const id = location.state?.id; // Extract the id from state

  console.log('Doctor ID from state:', id); // Debugging: Log the doctor ID

  const fetchAppointments = async () => {
    console.log('Doctor ID in fetchAppointments:', id); // Debugging: Check if id is defined
    console.log('Token:', localStorage.getItem('token')); // Debugging: Check if token is available
    try {
      console.log("a"); // Debugging: Check if try block is entered
      const token = localStorage.getItem('token');
      console.log('Fetching appointments for doctor ID:', id);
      const response = await axios.get(`http://localhost:5000/appointment/doctor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Appointments Response:', response.data); // Debugging: Log the response
      setAppointments(response.data.appointments);
      console.log("hello");
    } catch (error) {
      console.log("b"); // Debugging: Check if catch block is entered
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctorDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debugging: Log the token
      const response = await axios.get(`http://localhost:5000/doctor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Doctor Details Response:', response.data); // Debugging: Log the response
      setDoctor(response.data); // Set the doctor state with the response data
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDoctorDetails();
      fetchAppointments();
    } else {
      console.error('No id found in state');
      navigate('/'); // Redirect to login if id is not available
    }
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

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Doctor Dashboard</h2>

      {/* Toggle Buttons */}
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

      {/* Conditional Rendering */}
      <Row>
        <Col md={12}>
          {activeView === 'personalInfo' && doctor && <PersonalInfo doctor={doctor} />}
          {activeView === 'appointments' && <Appointments appointments={appointments} />}
        </Col>
      </Row>

      {/* Logout Button */}
      <div className="text-center mt-4">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default DoctorPage;
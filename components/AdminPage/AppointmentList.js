import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [searchType, setSearchType] = useState('all');
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/appointment/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllAppointments(response.data.appointments || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to fetch appointments');
    }
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchType === 'all') {
      setAppointments(allAppointments);
      return;
    }

    if (!searchId.trim()) {
      setError('Please enter an ID');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      let url = '';
      
      if (searchType === 'appointment_id') {
        url = `http://localhost:5000/appointment/${searchId}`;
      } else if (searchType === 'doctor_id') {
        url = `http://localhost:5000/appointment/doctor/${searchId}`;
      } else if (searchType === 'patient_id') {
        url = `http://localhost:5000/appointment/patient/${searchId}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = searchType === 'appointment_id' 
        ? [response.data.appointment] 
        : response.data.appointments;
      
      setAppointments(result || []);
    } catch (err) {
      console.error('Error searching appointments:', err);
      setError('No appointments found with the given criteria');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4 className="mb-4">Appointment Management</h4>
      
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="align-items-end">
          <Col md={3}>
            <Form.Group controlId="searchType">
              <Form.Label>Search By</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                <Button
                  variant={searchType === 'all' ? 'primary' : 'outline-primary'}
                  onClick={() => setSearchType('all')}
                >
                  All Appointments
                </Button>
                <Button
                  variant={searchType === 'appointment_id' ? 'primary' : 'outline-primary'}
                  onClick={() => setSearchType('appointment_id')}
                >
                  Appointment ID
                </Button>
                <Button
                  variant={searchType === 'doctor_id' ? 'primary' : 'outline-primary'}
                  onClick={() => setSearchType('doctor_id')}
                >
                  Doctor ID
                </Button>
                <Button
                  variant={searchType === 'patient_id' ? 'primary' : 'outline-primary'}
                  onClick={() => setSearchType('patient_id')}
                >
                  Patient ID
                </Button>
              </div>
            </Form.Group>
          </Col>
          
          {searchType !== 'all' && (
            <Col md={6}>
              <Form.Group controlId="searchId">
                <Form.Label>Enter {searchType.replace('_', ' ')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${searchType.replace('_', ' ')}`}
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </Form.Group>
            </Col>
          )}
          
          <Col md={searchType !== 'all' ? 3 : 9}>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Searching...</span>
                </>
              ) : (
                'Search'
              )}
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {(searchType === 'all' ? allAppointments : appointments).map((appointment) => (
          <Col md={6} key={appointment.appointment_id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Appointment ID: {appointment.appointment_id}</Card.Title>
                <Card.Text>
                  <strong>Doctor ID:</strong> {appointment.doctor_id.doctor_id }
                  <br />
                  <strong>Patient ID:</strong> {appointment.patient_id_patitent_id }
                  <br />
                  <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
                  <br />
                  <strong>Time:</strong> {appointment.appointmentTime}
                  <br />
                  <strong>Status:</strong> {appointment.status || 'Scheduled'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {(searchType === 'all' ? allAppointments : appointments).length === 0 && !loading && (
        <div className="text-center text-muted">No appointments found</div>
      )}
    </div>
  );
};

export default AppointmentList;
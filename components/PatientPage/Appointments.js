import React, { useState } from 'react';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const Appointments = ({ appointments, onDeleteSuccess }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (appointmentId) => {
    try {
      setDeletingId(appointmentId);
      setError('');
      setSuccess('');
      
      const token = localStorage.getItem('token');
      console.log(appointmentId);
      await axios.delete(`http://localhost:5000/appointment/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess('Appointment deleted successfully!');
      if (onDeleteSuccess) {
        onDeleteSuccess(); // This should trigger the parent to refresh
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete appointment');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h4 className="mb-4">Appointments</h4>
      
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Col md={6} key={appointment._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Appointment ID: {appointment.appointment_id}</Card.Title>
                  <Card.Text>
                  <strong>Doctor ID:</strong> {appointment.doctor_id.doctor_id}
                  <br />
                  <strong>Doctor Name:</strong> {appointment.doctor_id.name}
                    <br />
                    <strong>Doctor specialization:</strong> {appointment.doctor_id.specialization}
                    <br />
                    <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
                    <br />
                    <strong>Time:</strong> {appointment.appointmentTime}
                  </Card.Text>
                  <Button 
                    variant="danger"
                    onClick={() => handleDelete(appointment.appointment_id)}
                    disabled={deletingId === appointment.appointment_id}
                  >
                    {deletingId === appointment._id ? 'Deleting...' : 'Delete'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No appointments found.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Appointments;
import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreateAppointment = ({ patientId, onAppointmentCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    appointment_id: '',
    doctor_id: '',
    appointmentDate: '',
    appointmentTime: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/appointment', {
        appointment_id: formData.appointment_id,
        doctor_id: formData.doctor_id,
        patient_id: patientId,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Show success message
      setSuccess('Appointment created successfully!');
      
      // Clear form
      setFormData({
        appointment_id: '',
        doctor_id: '',
        appointmentDate: '',
        appointmentTime: ''
      });
      
      // Call parent callback after a short delay
      setTimeout(() => {
        onAppointmentCreated();
      }, 1500);
      
    } catch (error) {
      console.error('Error creating appointment:', error);
      setError(error.response?.data?.message || 'Failed to create appointment');
    }
  };

  return (
    <Card>
      <Card.Header>
        <h3>Create New Appointment</h3>
      </Card.Header>
      <Card.Body>
        {/* Success Alert */}
        {success && (
          <Alert variant="success" onClose={() => setSuccess('')} dismissible>
            {success}
          </Alert>
        )}
        
        {/* Error Alert */}
        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Appointment ID</Form.Label>
            <Form.Control
              type="text"
              name="appointment_id"
              value={formData.appointment_id}
              onChange={handleInputChange}
              placeholder="Enter appointment ID"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Doctor ID</Form.Label>
            <Form.Control
              type="text"
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleInputChange}
              placeholder="Enter doctor's ID"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onCancel} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Appointment
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateAppointment;
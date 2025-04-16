import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateForm = ({ doctor, onUpdate, onCancel, includePassword }) => {
  const [formData, setFormData] = useState({
    name: doctor.name,
    specialization: doctor.specialization,
    password: '', // New password field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/doctor/${doctor.doctor_id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate(response.data); // Pass updated data to the parent component
      alert('Details updated successfully!');
    } catch (error) {
      console.error('Error updating doctor details:', error);
      alert('Failed to update details');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {!includePassword && (
        <>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSpecialization">
            <Form.Label>Specialization</Form.Label>
            <Form.Control
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </>
      )}
      {includePassword && (
        <Form.Group controlId="formPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
      )}
      <Button variant="primary" type="submit" className="me-2">
        Submit
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateForm;
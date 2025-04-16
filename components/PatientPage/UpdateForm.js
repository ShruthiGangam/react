/*import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateForm = ({ patient, setIsUpdating }) => {
  const [formData, setFormData] = useState({
    name: patient.name,
    phoneNumber: patient.phoneNumber,
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
      await axios.put(`http://localhost:5000/patient/${patient.patient_id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Details updated successfully!');
      setIsUpdating(false); // Exit update mode
    } catch (error) {
      console.error('Error updating patient details:', error);
      alert('Failed to update details');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
      <Form.Group controlId="formPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>
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
      <Button variant="primary" type="submit" className="me-2">
        Submit
      </Button>
      <Button variant="secondary" onClick={() => setIsUpdating(false)}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateForm;*/

/*
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateForm = ({ patient, onUpdate, onCancel, includePassword }) => {
  const [formData, setFormData] = useState({
    name: patient.name,
    phoneNumber: patient.phoneNumber,
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
        `http://localhost:5000/patient/${patient.patient_id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate(response.data); // Pass updated data to the parent component
      alert('Details updated successfully!');
    } catch (error) {
      console.error('Error updating patient details:', error);
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
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>phoneNumber</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
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

export default UpdateForm;I*/

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateForm = ({ patient, onUpdate, onCancel, includePassword }) => {
  const [formData, setFormData] = useState({
    name: patient.name,
    phoneNumber: patient.phoneNumber,
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
        `http://localhost:5000/patient/${patient.patient_id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate(response.data); // Pass updated data to the parent component
      alert('Details updated successfully!');
    } catch (error) {
      console.error('Error updating patient details:', error);
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
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
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
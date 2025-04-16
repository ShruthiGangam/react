import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateForm = ({ userType }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    password: '',
    ...(userType === 'doctor' && { specialization: '' }),
    ...(userType === 'patient' && { phoneNumber: '' }),
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post(`http://localhost:5000/${userType}`, formData);
      alert('Account created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating account:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with:', error.response.data);
        alert(`Failed to create account: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('Failed to create account: No response from server');
      } else {
        // Something went wrong in setting up the request
        console.error('Request setup error:', error.message);
        alert('Failed to create account: Request setup error');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formId">
        <Form.Label>{userType === 'admin' ? 'Admin ID' : `${userType} ID`}</Form.Label>
        <Form.Control
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </Form.Group>
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
      {userType === 'doctor' && (
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
      )}
      {userType === 'patient' && (
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
      )}
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
  );
};

export default CreateForm;
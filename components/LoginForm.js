import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const userType = new URLSearchParams(location.search).get('userType'); // Get userType from URL query params

  console.log('User Type:', userType); // Debugging: Log the userType

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const response = await axios.post(`http://localhost:5000/login/${userType}`, formData);
      console.log('Response from server:', response);

      // Extract the token and id from the response
      const token = response.data.token; // Ensure the token is in response.data.token
      console.log(token)
      const id = formData.id; // Use the id from the form data

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Set the Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Debugging: Log the navigation details
      console.log('Navigating to:', userType, 'with id:', id);

      // Redirect based on user type and pass the id as state
      if (userType === 'doctor') {
        navigate('/doctor', { state: { id } }); // Redirect to doctor page
      } else if (userType === 'patient') {
        navigate('/patient', { state: { id } }); // Redirect to patient page
      } else if (userType === 'admin') {
        navigate('/admin', { state: { id } }); // Redirect to admin page
      } else {
        console.error('Invalid user type:', userType);
        navigate('/'); // Fallback to home page if userType is invalid
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{userType ? `${userType.charAt(0).toUpperCase() + userType.slice(1)} Login` : 'Login'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formId" className="mb-3">
          <Form.Label>{userType === 'admin' ? 'Admin ID' : `${userType} ID`}</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder={`Enter ${userType} ID`}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
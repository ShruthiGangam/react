import React, { useState } from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const PersonalInfo = ({ admin }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdate = async (updatedData) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const token = localStorage.getItem('token');
      console.log("i am here 123")
      const response = await axios.put(
        `http://localhost:5000/admin/${admin.admin_id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response)
      setSuccess('Profile updated successfully');
      setIsUpdating(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (passwordData) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      console.log("i am here 456")
      const token = localStorage.getItem('token');
      const a=await axios.put(
        `http://localhost:5000/admin/${admin.admin_id}`,
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(a)
      setSuccess('Password updated successfully');
      setIsUpdatingPassword(false);
    } catch (err) {
      console.error('Error updating password:', err);
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Personal Information</Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : isUpdating ? (
          <UpdateForm
            admin={admin}
            onUpdate={handleUpdate}
            onCancel={() => setIsUpdating(false)}
            includePassword={false}
          />
        ) : isUpdatingPassword ? (
          <UpdateForm
            admin={admin}
            onUpdate={handleUpdatePassword}
            onCancel={() => setIsUpdatingPassword(false)}
            includePassword={true}
          />
        ) : (
          <>
            <p><strong>Admin ID:</strong> {admin.admin_id}</p>
            <p><strong>Name:</strong> {admin.name}</p>
            <Button variant="primary" onClick={() => setIsUpdating(true)} className="me-2">
              Update Details
            </Button>
            <Button variant="warning" onClick={() => setIsUpdatingPassword(true)}>
              Update Password
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

const UpdateForm = ({ admin, onUpdate, onCancel, includePassword }) => {
  const [formData, setFormData] = useState({
    name: admin.name || '',
    ...(includePassword && { currentPassword: '', newPassword: '', confirmPassword: '' })
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (includePassword && formData.newPassword !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onUpdate(includePassword ? 
      { currentPassword: formData.currentPassword, newPassword: formData.newPassword } : 
      { name: formData.name }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {!includePassword ? (
        <>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
        </>
      ) : (
        <>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
      
      <div className="d-flex gap-2">
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfo;
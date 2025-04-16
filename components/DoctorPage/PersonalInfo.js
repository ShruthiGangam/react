import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import UpdateForm from './UpdateForm';

const PersonalInfo = ({ doctor }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleUpdate = (updatedData) => {
    // Update local state (replace with API call if needed)
    setIsUpdating(false);
  };

  const handleUpdatePassword = (newPassword) => {
    // Update local state (replace with API call if needed)
    setIsUpdatingPassword(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Personal Information</Card.Title>
        {isUpdating ? (
          <UpdateForm
            doctor={doctor}
            onUpdate={handleUpdate}
            onCancel={() => setIsUpdating(false)}
            includePassword={false}
          />
        ) : isUpdatingPassword ? (
          <UpdateForm
            doctor={doctor}
            onUpdate={(data) => handleUpdatePassword(data.password)}
            onCancel={() => setIsUpdatingPassword(false)}
            includePassword={true}
          />
        ) : (
          <>
            <p><strong>Doctor ID:</strong> {doctor.doctor_id}</p>
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
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

export default PersonalInfo;
/*import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import UpdateForm from './UpdateForm';
import axios from 'axios';

const PersonalInfo = () => {
  const [patient, setPatient] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch patient details
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/patient', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, []);

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Personal Information</Card.Title>
        {isUpdating ? (
          <UpdateForm patient={patient} setIsUpdating={setIsUpdating} />
        ) : (
          <>
            <p><strong>Patient ID:</strong> {patient.patient_id}</p>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
            <Button variant="primary" onClick={() => setIsUpdating(true)} className="me-2">
              Update Details
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default PersonalInfo;*/

/*
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import UpdateForm from './UpdateForm';

const PersonalInfo = ({ patient }) => {
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
            patient={patient}
            onUpdate={handleUpdate}
            onCancel={() => setIsUpdating(false)}
            includePassword={false}
          />
        ) : isUpdatingPassword ? (
          <UpdateForm
            patient={patient}
            onUpdate={(data) => handleUpdatePassword(data.password)}
            onCancel={() => setIsUpdatingPassword(false)}
            includePassword={true}
          />
        ) : (
          <>
            <p><strong>Patient ID:</strong> {patient.patient_id}</p>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Phone Number:</strong> {patient.specialization}</p>
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

export default PersonalInfo;*/
/*
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import UpdateForm from './UpdateForm';

const PersonalInfo = ({ patient }) => {
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
            patient={patient}
            onUpdate={handleUpdate}
            onCancel={() => setIsUpdating(false)}
            includePassword={false}
          />
        ) : isUpdatingPassword ? (
          <UpdateForm
            patient={patient}
            onUpdate={(data) => handleUpdatePassword(data.password)}
            onCancel={() => setIsUpdatingPassword(false)}
            includePassword={true}
          />
        ) : (
          <>
            <p><strong>Patient ID:</strong> {patient.patient_id}</p>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
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

export default PersonalInfo;*/

import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import UpdateForm from './UpdateForm';

const PersonalInfo = ({ patient }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleUpdate = (updatedData) => {
    // Update local state or make an API call
    setIsUpdating(false);
  };

  const handleUpdatePassword = (newPassword) => {
    // Update local state or make an API call
    setIsUpdatingPassword(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Personal Information</Card.Title>
        {isUpdating ? (
          <UpdateForm
            patient={patient}
            onUpdate={handleUpdate}
            onCancel={() => setIsUpdating(false)}
            includePassword={false}
          />
        ) : isUpdatingPassword ? (
          <UpdateForm
            patient={patient}
            onUpdate={(data) => handleUpdatePassword(data.password)}
            onCancel={() => setIsUpdatingPassword(false)}
            includePassword={true}
          />
        ) : (
          <>
            <p><strong>Patient ID:</strong> {patient.patient_id}</p>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
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
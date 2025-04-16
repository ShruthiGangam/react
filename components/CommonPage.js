import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import LoginForm from './LoginForm';
import CreateForm from './CreateForm';
import { useLocation, useNavigate } from 'react-router-dom';

const CommonPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get('userType');
  const [activeForm, setActiveForm] = useState('login'); // State to manage active form

  // Function to handle going back to the UserSelection page
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{userType.toUpperCase()} Portal</h2>
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-center mb-4">
            <Button
              variant={activeForm === 'login' ? 'primary' : 'outline-primary'}
              className="me-2"
              onClick={() => setActiveForm('login')}
            >
              Login
            </Button>
            <Button
              variant={activeForm === 'create' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveForm('create')}
            >
              Create
            </Button>
          </div>

          {/* Render the appropriate form based on the activeForm state */}
          {activeForm === 'login' && <LoginForm userType={userType} />}
          {activeForm === 'create' && <CreateForm userType={userType} />}
        </Card.Body>
      </Card>
      <Button variant="secondary" onClick={handleBack} className="mb-3">
        Back to User Selection
      </Button>
    </div>
  );
};

export default CommonPage;
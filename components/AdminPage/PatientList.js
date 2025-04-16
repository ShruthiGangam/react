import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const PatientList = ({ patients }) => {
  return (
    <div>
      <h4 className="mb-4">All Patients</h4>
      <Row>
        {patients.map((patient) => (
          <Col md={6} key={patient.patient_id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Patient ID: {patient.patient_id}</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {patient.name}
                  <br />
                  <strong>Phone Number:</strong> {patient.phoneNumber}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PatientList;
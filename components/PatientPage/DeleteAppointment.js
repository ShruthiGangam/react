// src/components/PatientPage/Appointments.js
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Appointments = ({ appointments }) => {
  return (
    <div>
      <h4 className="mb-4">Appointments</h4>
      <Row>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Col md={6} key={appointment._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Appointment ID: {appointment.appointment_id}</Card.Title>
                  <Card.Text>
                    <strong>Doctor ID:</strong> {appointment.doctor_id}
                    <br />
                    <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
                    <br />
                    <strong>Time:</strong> {appointment.appointmentTime}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No appointments found.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Appointments;
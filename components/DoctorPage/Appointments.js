import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Appointments = ({ appointments }) => {
  return (
    <div>
      <h4 className="mb-4">Appointments</h4>
      <Row>
        {appointments.map((appointment) => (
          <Col md={6} key={appointment.appointment_id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Appointment ID: {appointment.appointment_id}</Card.Title>
                <Card.Text>
                <strong>Patient ID:</strong> {appointment.patient_id.patient_id}
                <br />
                <strong>Patient name:</strong> {appointment.patient_id.name}
                  <br />
                  <strong>Patient Phone Number:</strong> {appointment.patient_id.phoneNumber}
                  <br />
                  <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
                  <br />
                  <strong>Time:</strong> {appointment.appointmentTime}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Appointments;
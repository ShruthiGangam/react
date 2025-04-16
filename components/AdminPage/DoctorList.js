import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
/*
const DoctorList = ({ doctors }) => {
  return (
    <div>
      <h4 className="mb-4">All Doctors</h4>
      <Row>
        {doctors.map((doctor) => (
          <Col md={6} key={doctor.doctor_id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Doctor ID: {doctor.doctor_id}</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {doctor.name}
                  <br />
                  <strong>Specialization:</strong> {doctor.specialization}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
*/
/*
const DoctorList = ({ doctors = [] }) => {
  console.log('Doctors:', doctors); // Debugging: Log the doctors prop
  return (
    <div>
      <h4 className="mb-4">All Doctors</h4>
      <Row>
        {doctors.map((doctor) => (
          <Col md={6} key={doctor.doctor_id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Doctor ID: {doctor.doctor_id}</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {doctor.name}
                  <br />
                  <strong>Specialization:</strong> {doctor.specialization}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};*/

const DoctorList = ({ doctors = [] }) => {
  return (
    <div>
      <h4 className="mb-4">All Doctors</h4>
      <Row>
        {doctors.map((doctor) => (
          <Col md={6} key={doctor.doctor_id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Doctor ID: {doctor.doctor_id}</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {doctor.name}
                  <br />
                  <strong>Specialization:</strong> {doctor.specialization}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default DoctorList;
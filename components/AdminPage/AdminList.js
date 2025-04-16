import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const AdminList = ({ admins }) => {
  return (
    <div>
      <h4 className="mb-4">All Admins</h4>
      <Row>
        {admins.map((admin) => (
          <Col md={6} key={admin.admin_id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Admin ID: {admin.admin_id}</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {admin.name}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminList;
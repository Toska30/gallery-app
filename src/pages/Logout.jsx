import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Logout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutFunc = async () => {
      await logout();
      navigate(`/login`);
    };
    logoutFunc();
  });

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Log Out</Card.Title>

              <Card.Text>
                Please wait while you're being logged out...
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Logout;

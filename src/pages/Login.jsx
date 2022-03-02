{/*import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import bghome from "../assets/scss/bghome.webp";
import "../App.scss"

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // try to login the user with the specified credentials
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(`/`);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${bghome})`,
        objectFit: "cover",
        minHeight: "100vh"}}>
      
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="Log">
            <Card.Body>
              <Card.Title className="mb-3">Log In</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Button disabled={loading} type="submit">
                  Log In
                </Button>
              </Form>

              <div className="text-center mt-3">

            Need an account? <Link to={`/SignUp`}>Sign Up</Link>
            </div>
            </Card.Body>
          </Card>

         
          
        </Col>
      </Row>
      </div> 
    
  );
};

export default Login;*/}
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext';
import bghome from "../assets/scss/bghome.webp";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { login } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/albums")
        }   catch (e) {
            setError(e.message)
        }
    }

    return (
      <div style={{ backgroundImage: `url(${bghome})`,
      objectFit: "cover",
      minHeight: "100vh"}}>
        
        <Container>
        <div className="d-flex flex-column justify-content-center order">
            { error && <Alert>{error}</Alert> }

            <Form onSubmit={handleSubmit}>

                <Form.Group id="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Button disabled={loading} type="submit">Log In</Button>
            </Form>

            <div className="text-center mt-3">
				<Link to="/register">Register</Link>
        </div>
      </div> 
        </Container>
        
        </div> 
    )
}

export default Login

   
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext';
import bghome from "../assets/scss/bghome.webp";

const Register = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { register } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords does not match");
        }

        setError(null);

        try {
            await register(emailRef.current.value, passwordRef.current.value)
            navigate("/albums")
        }   catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={{ backgroundImage: `url(${bghome})`,
      objectFit: "cover",
      minHeight: "100vh"}}>
        <Container>
            <div className="d-flex flex-column justify-content-center order">
            {error && <Alert>{error}</Alert>}

            <Form onSubmit={handleSubmit}>

                <Form.Group id="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required />
                </Form.Group>

                <Button disabled={loading} type="submit">Create Account</Button>
            </Form>
            </div>
        </Container>
        </div>
    )
}

export default Register
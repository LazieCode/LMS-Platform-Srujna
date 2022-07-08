import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import Axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

const Feedback = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Srujna</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/adminpage">Admin</Nav.Link>


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Course Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Feedback</Form.Label>
                        <Form.Control type="text" placeholder="Description" />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={() => navigate("/dashboard")}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Feedback
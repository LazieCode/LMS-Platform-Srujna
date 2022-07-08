import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
const Marking = () => {
    const navigate = useNavigate();

    const [course, updatecourse] = useState(null);
    const [user, updateuser] = useState(null);
    const [score, updatescore] = useState(null);
    const marking = (event) => {
        event.preventDefault();
        Axios.post("https://deploycfg.herokuapp.com/markascomplete", {
            "courseid": "3",
            "userid": "5",
            "score": "10",
        }).then(res => alert("user Marked"), navigate("/superlady")).catch(err => alert("user Marked"), navigate("/superlady"));
    }
    console.log(parseInt(course), parseInt(user), parseInt(score));
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
                <Form onSubmit={marking}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Course Id</Form.Label>
                        <Form.Control type="number" placeholder="Enter name" onChange={(e) => updatecourse(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Id</Form.Label>
                        <Form.Control type="number" placeholder="Description" onChange={(e) => updateuser(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Score</Form.Label>
                        <Form.Control type="number" placeholder="Link" onChange={(e) => updatescore(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => { marking(); }}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )

}

export default Marking;
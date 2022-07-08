import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
const CreateCourse = () => {
    const navigate = useNavigate();

    const [name, updateName] = useState(null);
    const [category, updateCategory] = useState(null);
    const [description, updateDescription] = useState(null);
    const [link, updateLink] = useState(null);
    const createCourse = (event) => {
        event.preventDefault();
        Axios.post("https://deploycfg.herokuapp.com/api/course_create", {
            "name": name,
            "description": description,
            "Link": link,
            "Category": category,

        }).then(res => alert("Course Created"), navigate("/adminPage")).catch(err => console.log(err));
    }
    console.log(name, category, description, link);
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
                <Form onSubmit={createCourse}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={(e) => updateName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" onChange={(e) => updateDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Link</Form.Label>
                        <Form.Control type="text" placeholder="Link" onChange={(e) => updateLink(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Category" onChange={(e) => updateCategory(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => { createCourse(); }}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default CreateCourse
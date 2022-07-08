
import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Axios from 'axios';
import Chart from '../Components/dashboard/Chart';
const AdminPage = () => {
    const [users, updateUsers] = useState([]);
    const [superLady, updateSuperLady] = useState([]);
    const getUser = () => {
        Axios.get("https://deploycfg.herokuapp.com/allusers")
            .then(res => updateUsers(res.data.data))
            .catch(err => console.log(err))
    }
    const getSuperLady = () => {
        Axios.get("https://deploycfg.herokuapp.com/allSuperLadies")
            .then(res => updateSuperLady(res.data.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getUser()
        getSuperLady()
    }, [])
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/dashboard">Home</Nav.Link>
                            <Nav.Link href="/create">Create Course</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid >
                <Card className="text-center">
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title> Deepak sahai</Card.Title>
                        <Card.Text >
                            Kerala
                        </Card.Text>


                        {/* <Button variant="primary"></Button> */}
                    </Card.Body>

                </Card>
            </Container>
            <Container>
                <Row>
                    <Col className="bg-primary p-2">
                        <h1>User</h1>
                        {
                            users.map((row) => (
                                <Card className="text-center" key={row.id}>
                                    <Card.Header>{row.full_name}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{row.username}</Card.Title>
                                        <Card.Text>
                                            {row.phone_no}
                                        </Card.Text>

                                    </Card.Body>

                                </Card>
                            ))
                        }
                    </Col>
                    <Col className="bg-primary p-2">
                        <h1>Super Lady</h1>
                        {
                            superLady.map((row) => (
                                <Card className="text-center" key={row.id}>
                                    <Card.Header>{row.full_name}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{row.phone_no}</Card.Title>
                                        <Card.Text>
                                            Narobi Shah
                                        </Card.Text>

                                    </Card.Body>

                                </Card>
                            ))
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AdminPage;
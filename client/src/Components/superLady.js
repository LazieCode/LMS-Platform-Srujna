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


function MyVerticallyCenteredModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    User Assignment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.name}</h4>
                <DropdownButton id="dropdown-item-button" title="Dropdown button">
                    <Dropdown.ItemText>Select Courses</Dropdown.ItemText>
                    {props.courses.map((rows) => (
                        <Dropdown.Item as="button">{rows.name}</Dropdown.Item>
                    ))}

                    {/* <Dropdown.Item as="button">Course 2</Dropdown.Item>
                    <Dropdown.Item as="button">Course 3</Dropdown.Item> */}
                </DropdownButton>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Assign</Button>
            </Modal.Footer>
        </Modal>
    );
}
const SuperLady = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [user, updateUsers] = useState([]);
    const [courses, updateCourses] = React.useState([]);

    useEffect(() => {
        fetchLocationUser();
        fetchCourse()
    }, [])
    const fetchLocationUser = () => {
        Axios.get("https://cfgnode.herokuapp.com/api/V1/user/getUser?location=Kerala")
            .then(res => updateUsers(res.data.user))
            .catch(err => console.log(err));
    }
    const fetchCourse = () => {
        Axios.get("https://cfgnode.herokuapp.com/api/V1/user/getAllCourses")
            .then(res => updateCourses(res.data.course))
            .catch(err => console.log(err))
    }
    return (
        <>

            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/dashboard">Home</Nav.Link>
                            <Nav.Link href="/marking">Mark Status</Nav.Link>
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
            <div>

            </div>
            <Container fluid >
                <Card className="text-center">
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>Super Lady</Card.Title>
                        <Card.Text>
                            Narobi Shah
                        </Card.Text>
                        {/* <Button variant="primary"></Button> */}
                    </Card.Body>

                </Card>
            </Container>

            <Container>
                <Row>
                    <Col className="bg-primary p-2">
                        {
                            user.map((row) => (
                                <Card className="text-center" key={row.id}>
                                    <Card.Header>{row.full_name}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{row.username}</Card.Title>
                                        <Card.Text>
                                            {row.phone_no}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => setModalShow(true)}>
                                            Assign
                                        </Button>

                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            courses={courses}
                                            name={row.full_name}
                                        />
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

export default SuperLady;
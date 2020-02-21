import React from 'react';

import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';

const NavComponent = () => (
    <Navbar variant="dark">
        <div className="row w-100">
            <div className="col-3">
                <Navbar.Brand href="/"  >Navbar</Navbar.Brand>
            </div>
            <div className="col-3">
                <Form>
                    <FormControl type="text" placeholder="Search"/>
                </Form>
            </div>
            <div className="col-6">
                <Nav className="float-right">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="profile">Profile</Nav.Link>
                    <Nav.Link href="pricing">Pricing</Nav.Link>
                </Nav>
            </div>
        </div>
    </Navbar>
);

export default NavComponent;
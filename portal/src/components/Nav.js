import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import Search from './Search'; 

const NavComponent = () => (
    <Navbar variant="dark">
        <div className="row w-100 mt-1">
            <div className="col-2">
                <Navbar.Brand href="/"  >Navbar</Navbar.Brand>
            </div>
            <div className="col-4">
                <Search />
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
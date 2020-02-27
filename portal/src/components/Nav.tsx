import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import Search from './Search'; 
import { removeAccessTokens } from '../services';

const NavComponent = () => (
    <Navbar>
        <div className="nav row w-100 mt-1">
            <div className="col-2">
                <Navbar.Brand href="/"  >
                <img
                    src="/nav-brand.svg"
                    width="75"
                    className="d-inline-block align-top ml-3"
                    alt="PaperRobin logo"
                />
                </Navbar.Brand>
            </div>
            <div className="col-4">
                <Search />
            </div>
            <div className="col-6">
                <Nav className="float-right">
                    {/* <Nav.Link href="/">Home</Nav.Link> */}
                    {/* <Nav.Link href="profile">Profile</Nav.Link> */}
                    <Nav.Link href="/" onClick={removeAccessTokens}>Logout</Nav.Link>
                </Nav>
            </div>
        </div>
    </Navbar>
);

export default NavComponent;
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'>ProShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbarScroll' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link href='/cart'>
                                <i className='fas fa-shopping-cart mx-2'></i>Cart
                            </Nav.Link>
                            <Nav.Link href='/login'>
                                <i className='fas fa-user mx-2'></i>Sign In
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;

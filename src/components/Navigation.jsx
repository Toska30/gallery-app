import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Navigation = () => {
    const { currentUser, logout } = useAuthContext()

    const logOut = async () => {
        await logout()
    }

  return (
    <Navbar
      collapseOnSelect
      className="nav"
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
    >
      <Container style={{ maxWidth: "1200px" }}>
        <Link to={currentUser ? "/albums" : "/"} className="navbar-brand">
          <span className="brand" role="img">
           Bild App
          </span>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            { currentUser ? 
                <>
                    <Nav.Link to={"/albums"} as={Link} className="ms-4" eventKey="1">
                        <span>My albums</span>
                    </Nav.Link>
                    <Nav.Link to={"/"} as={Link} className="ms-4" eventKey="2">
                        <span onClick={logOut}>Log Out</span>
                    </Nav.Link>
                </> :

                <>
                    <Nav.Link to={"/"} as={Link} className="ms-4" eventKey="1">
                        <span>Login</span>
                    </Nav.Link>
                    <Nav.Link to={"/register"} as={Link} className="ms-4" eventKey="2">
                        <span>SignUp</span>
                    </Nav.Link>
                </> }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
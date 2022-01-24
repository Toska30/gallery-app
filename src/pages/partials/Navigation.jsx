import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import "../../App.scss" 

const Navigation = () => {
	const { currentUser } = useAuthContext();

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="md">
				<Container>
					<Navbar.Brand to="/">Bild app</Navbar.Brand>
					<Nav className="me-auto1">
						<NavLink to="/" className="nav-link">
							Home
						</NavLink>
						{currentUser ? (
							<>
								<NavLink to="/albums" className="nav-link">
									Albums
								</NavLink>
								<NavLink
									to="/create-album"
									className="nav-link">
									Create album
								</NavLink>
								<NavLink to="/logout" className="nav-link">
									Logout
								</NavLink>
							</>
						) : (
							<>
								<NavLink to="/login" className="nav-link">
									Login
								</NavLink>
							</>
						)}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;

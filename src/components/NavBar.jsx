import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { loggedInUser } from "../features/Auth/Auth";
import { useSelector } from "react-redux";
const NavBar = () => {
  const user = useSelector(loggedInUser);
  const token = user?.user_auth;
  const usermail = user?.email ? user?.email : null;
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">BLOG {token ? `: ${user.name}` : null}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {token ? (
              <Nav className="me-auto">
                <Nav.Link href="/users">People</Nav.Link>
                <Nav.Link href="/complete_profile">Profile</Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">SignUp</Nav.Link>
              </Nav>
            )}
            <Navbar.Text>{usermail}</Navbar.Text>
            {token ? (
              <Form>
                <Logout />
              </Form>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

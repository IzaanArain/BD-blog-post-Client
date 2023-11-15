import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { loggedInUser } from "../features/Auth/Auth";
import { useSelector } from "react-redux";
const NavBar = () => {
  const user = useSelector(loggedInUser);
  const token = user?.user_auth;
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">BLOG</Navbar.Brand>
          {token ? (
            <Nav className="me-auto">
              <Nav.Link href="#home">
                <Link to="/login">
                  <Link to="/users">People</Link>
                </Link>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link href="#home">
                <Link to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link href="#features">
                <Link to="/signup">SignUp</Link>
              </Nav.Link>
            </Nav>
          )}
          {token ? <Logout /> : null}
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

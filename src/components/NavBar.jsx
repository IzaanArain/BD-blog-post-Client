import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logout from './Logout'

const NavBar = () => {
  return (
    <>
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">BLOG</Navbar.Brand>
        <Logout/>
      </Container>
    </Navbar>
    </>
  )
}

export default NavBar;
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiOutlineMail as EmailLogo } from "react-icons/ai";
import { RiLockPasswordFill as PasswordLogo } from "react-icons/ri";
import { useState } from "react";
import { loginApi, loggedInUser } from "../features/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibilty, setPasswordVisibilty] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(loggedInUser);
  // console.log("logged In User", user);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginApi({
        email,
        password,
      })
    );
  };

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col lg={6}>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3 mt-3" controlId="loginEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="loginPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-describedby="passwordHelpBlock"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Password should include at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Password should include at least 8 characters, one uppercase
                    letter, one lowercase letter, one digit, and one special
                    character.
                  </Form.Text>
                </Col>
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" size="sm">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;

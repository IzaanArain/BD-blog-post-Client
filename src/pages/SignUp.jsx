import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiOutlineMail as MailLogo } from "react-icons/ai";
import { RiLockPasswordFill as PasswordLogo } from "react-icons/ri";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpApi,signUpUser} from "../features/Auth/Auth";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const user=useSelector(signUpUser); 
  // console.log(user)

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUpApi({
        email,
        password,
      })
    );  
    navigate("/otp_verify",{state:{email}});
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer/>
      </Container>
    </>
  );
};

export default SignUp;

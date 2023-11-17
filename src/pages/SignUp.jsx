import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiOutlineMail as MailLogo } from "react-icons/ai";
import { RiLockPasswordFill as PasswordLogo } from "react-icons/ri";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpApi, signUpUser } from "../features/Auth/Auth";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibilty, setPasswordVisibilty] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(signUpUser);

  const onSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      dispatch(
        signUpApi({
          email,
          password,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/otp_verify", { state: { email } });
        });
    } else {
      toast.error(`password and confirm password do not match`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3 mt-3">
                <Form.Label column sm="2" htmlFor="email">
                  Email address
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" htmlFor="password">
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Password should include at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" htmlFor="confirmPassword">
                  Confirm Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Password should include at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
                  />
                </Col>
              </Form.Group>
                <Button variant="primary" type="submit" size="sm">
                  Submit
                </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;

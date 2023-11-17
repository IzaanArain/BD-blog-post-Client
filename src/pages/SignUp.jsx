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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(signUpUser);

  const onSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={6} xxl={12}>
            <Card>
              <Row>
                <Col>
                  <Card.Img
                    src=""
                    alt=""
                    onError={(err) => {
                      err.target.src =
                        "https://www.state.gov/wp-content/uploads/2019/04/Pakistan-2115x1406.jpg";
                    }}
                    width="100%"
                    height="100%"
                  />
                </Col>

                <Col>
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
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
                          required
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
                          required
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                          title="Password should include at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
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
                          required
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                          title="Password should include at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit" size="lg">
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;

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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibilty, setPasswordVisibilty] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(loggedInUser);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginApi({
        email,
        password,
      })
    )
      .unwrap()
      .then(({data})=>{
        const is_complete=data?.user?.is_complete;
        if(is_complete){
          navigate("/users")
        }else{
          navigate("/complete_profile")
        }
      })
      .catch((err) => {
        const msg = err?.message;
        if (msg === "user is not verified") {
          navigate("/otp_verify", { state: { email: email } });
        }
      });
  };

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col lg={6}>
            <Form onSubmit={onSubmit} className="mt-3">
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
                    // required
                    // pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                    // title="enter valid email"
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
                    aria-describedby="passwordHelpBlock"
                    // required
                    // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    // title="Password should include at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
                  />

                  <div className="d-flex flex-column">
                    <Form.Text id="passwordHelpBlock" muted>
                      Password should include at least 8 characters, one
                      uppercase letter, one lowercase letter, one digit, and one
                      special character.
                    </Form.Text>
                    <Link to="/forgot_password">Forgot Password?</Link>
                  </div>
                </Col>
              </Form.Group>

              <div className="d-flex flex-column align-items-center">
                <Button
                  variant="primary"
                  type="submit"
                  size="md"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
                <Form.Text style={{ fontSize: "16px" }}>
                  Not a member yet ? <Link to="/signup">SignUp Now</Link>
                </Form.Text>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;

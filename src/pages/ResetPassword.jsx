import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { resetPasswordApi } from "../features/Auth/Auth";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const userEmail = location?.state?.email ? location?.state?.email : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onsubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(
        resetPasswordApi({
          email: userEmail,
          password: password,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/login");
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
            <Form className="mt-3" onSubmit={onsubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" htmlFor="password">
                  Password
                </Form.Label>
                <Col sm={9}>
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
                <Form.Label column sm="3" htmlFor="confirmPassword">
                  Confirm Password
                </Form.Label>
                <Col sm={9}>
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
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  size="sm"
                  style={{ width: "100%" }}
                >
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

export default ResetPassword;

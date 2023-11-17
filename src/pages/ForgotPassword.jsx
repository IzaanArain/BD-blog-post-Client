import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordApi } from "../features/Auth/Auth";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      ForgotPasswordApi({
        email,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/otp_verify",{state:{email}});
      });
  };
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col lg={6}>
            <Form className="mt-3" onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3" htmlFor="email">
                  Email address
                </Form.Label>
                <Col sm={9}>
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

export default ForgotPassword;

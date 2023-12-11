import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { completeProfileApi } from "../features/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "../features/Auth/Auth";

const url = `http://localhost:5001`;

const CompleteProfile = () => {
  const user = useSelector(loggedInUser);
  const userName=user?.name ? user?.name : "" ;
  const userPhone=user?.phone ? user?.phone : "" ;
  const userImage=user?.image ? user?.image : "" ;
  const [name, setName] = useState(userName);
  const [phone, setPhone] = useState(userPhone);
  const [image, setImage] = useState(userImage);
  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();
  const newImage = `${url}/${user.image}`;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("profile_image", image);
  console.log("form-data",formData)
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("test image", image);
    dispatch(completeProfileApi(formData));
  };
  return (
    <>
      <Container>
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <Col lg={6} className="text-center mt-3">
            <Image
              src={imagePreview ? imagePreview : newImage}
              alt=""
              roundedCircle
              className="border border-dark"
              width={200}
              height={200}
              onError={(e)=>{
                e.target.src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
              }}
            />
          </Col>
          <Col lg={6}>
            <Form className="mt-3" onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="3">
                  Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    // id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="phone">
                <Form.Label column sm="3">
                  phone
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    // id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    // required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="profile_image">
                <Form.Label column sm="3">
                  phone
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="file"
                    filename="profile_image"
                    placeholder="Enter profile image"
                    // id="profile_image"
                    name="profile_image"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                      console.log(URL.createObjectURL(e.target.files[0]));
                    }}
                    // accept=".png, .jpg, .jpeg, .gif"
                    // required
                  />
                </Col>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                size="md"
                className="mb-3"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CompleteProfile;

import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import DefaultImage from "../assets/NoImage.jpg"
import { useDispatch } from "react-redux";
const UserCard = ({ user }) => {
  const { name, email, image,_id } = user;
  const dispatch=useDispatch();

  const getChat=(e)=>{     
    e.preventDefault();
  }
  
  return (
    <>
      <div onClick={getChat}>
        <Card className="mb-3 p-2">
          <Row>
            <Col
              lg={3}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src={image ? `${import.meta.env.VITE_API_URL}${image}` : DefaultImage}
                // onError={(e) => {
                //   e.target.src = DefaultImage
                // }}
                roundedCircle
                className="border border-dark"
                width={100}
                height={100}
              />
            </Col>
            <Col lg={9}>
              <Card.Body>
                <Card.Title>{email}</Card.Title>
                <Card.Text>Name : {name}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default UserCard;

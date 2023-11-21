import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const UserCard = ({ user }) => {
  const { name, email, image,_id } = user;
  const url = `http://localhost:5000`;

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
                src={`${url}/${image}`}
                onError={(e) => {
                  e.target.src =
                    "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg";
                }}
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

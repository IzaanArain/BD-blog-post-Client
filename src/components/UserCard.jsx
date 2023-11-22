import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import DefaultImage from "../assets/NoImage.jpg"

const UserCard = ({ user }) => {
  const { name, email, image,_id } = user;
  // const url = `http://localhost:5000`;
console.log(`${process.env.TEST}`)

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
              {/* <Image
                src={`${process.env.REACT_APP_APIURL}${image}`}
                onError={(e) => {
                  e.target.src = DefaultImage
                }}
                roundedCircle
                className="border border-dark"
                width={100}
                height={100}
              /> */}
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

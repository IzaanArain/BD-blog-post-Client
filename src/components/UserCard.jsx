import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import NoImage from "../assets/NoImage.jpg";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const { name, email, image, _id } = user;
  const navigate=useNavigate();

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          width={100}
          height={180}
          src={image ? `${import.meta.env.VITE_API_URL}${image}` : NoImage}
        />
        <Card.Body>
          <Card.Title>{email}</Card.Title>
          <Card.Text>Name : {name}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={(e)=>{
            navigate("/chat",{state:{receiver_id:_id}})
          }}>...Start chatting</Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default UserCard;

import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const UserCard = ({ user }) => {
  const { name, phone, image } = user;
  const url = `http://localhost:5000`;
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`${url}/${image}`}
          onError={(e) => {
            e.target.src =
              "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg";
          }}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>phone:{phone}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserCard;

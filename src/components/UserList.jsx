import Container from "react-bootstrap/Container";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserCard from "./UserCard";

const UserList = () => {
  return (
    <>
      <h1>users</h1>
      <UserCard/>
    </>
  );
};

export default UserList;

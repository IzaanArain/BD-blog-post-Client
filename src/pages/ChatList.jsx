import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserList from "../components/UserList";

const ChatList = () => {
  return (
    <>
      <Container>
        <UserList />
      </Container>
    </>
  );
};

export default ChatList;

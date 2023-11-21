import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserList from "../components/UserList";
import Chat from "../components/Chat";

const ChatList = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={4}>
            <UserList />
          </Col>
          <Col lg={8}>
            <Chat />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatList;

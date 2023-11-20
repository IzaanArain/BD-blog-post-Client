import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserList from "../components/UserList";

const ChatList = () => {
  return (
    <>
      <Container fluid>
        <Row>
            <Col lg={6}>
            <UserList/>
            </Col>
            <Col>

            </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatList;

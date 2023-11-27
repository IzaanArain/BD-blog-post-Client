import { useState,useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserList from "../components/UserList";
import Chat from "../components/Chat";
import { useDispatch,useSelector } from "react-redux";
import { socketConnect } from "../features/Messages/MessageSlice";
import { useSocket } from "../features/Messages/MessageSlice";
const ChatList = () => {
  const dispatch=useDispatch();
  const socket=useSelector(useSocket);

  useEffect(()=>{
    // console.log("socket")
    dispatch(socketConnect());
  },[socket])

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

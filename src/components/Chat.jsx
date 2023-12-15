import { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "../features/Auth/Auth";
import { useLocation } from "react-router-dom";
import {
  emitMesseges,
  useSocket,
  emitSendMessage,
} from "../features/Messages/MessageSlice";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const sender = useSelector(loggedInUser);
  const sender_id = sender?._id;
  const location = useLocation();
  const receiver_id = location?.state?.receiver_id;
  const dispatch = useDispatch();
  const socket = useSelector(useSocket);
  //  console.log("chat",socket);
  useEffect(() => {
    dispatch(
      emitMesseges({
        sender_id,
        receiver_id,
      })
    );
  }, [dispatch, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("get_all_messages", (data) => {
        setMessages(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        sender_id: sender_id,
        receiver_id: receiver_id,
        message: currentMessage,
      };
      dispatch(emitSendMessage(messageData));
      setCurrentMessage("");
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="chat">
              <div className="chat-header">
                <h1>Live Chat</h1>
              </div>
              <div className="chat-body">
                {messages.map((msg, i) => {
                  return (
                    <Fragment key={i}>
                      <div
                        className="message"
                        id={sender_id === msg.sender_id ? "you" : "other"}
                      >
                        <div className="message-content">
                          <p>{msg.message}</p>
                        </div>
                        <div className="message-meta">
                          <p>{msg.time}</p>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
              <div className="chat-footer">
                <input
                  type="text"
                  placeholder="Hey..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  // onKeyDown={(e)=>{
                  //   e.key==="Enter" && sendMessage()
                  // }}
                />
                <button onClick={sendMessage}>&#9658;</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Chat;

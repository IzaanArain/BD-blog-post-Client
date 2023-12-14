import { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../features/Messages/MessageSlice";
import { loggedInUser } from "../features/Auth/Auth";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const socket = useSelector(useSocket);
  const sender = useSelector(loggedInUser);
  const sender_id = sender?._id;

  useEffect(() => {
    if (socket) {
      socket.on("get_all_messages", (data) => {
        setMessages((prev) => [...prev,...data]);
      });
    }
  }, [socket]);
  // console.log("messages", messages);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {};
      await socket.emit("send_message", messageData);
      setMessages((prev) => {
        return [...prev, messageData];
      });
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
                          <p>
                            {msg.author} : {msg.time}
                          </p>
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

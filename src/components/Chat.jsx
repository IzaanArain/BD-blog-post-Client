import { Fragment, useEffect, useState, useRef } from "react";
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
  useMessage,
  setMessages,
  addMessage,
} from "../features/Messages/MessageSlice";

const Chat = () => {
  // const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const sender = useSelector(loggedInUser);
  const sender_id = sender?._id;
  const location = useLocation();
  const {receiver_id,name:receiverName} = location?.state;
  const dispatch = useDispatch();
  const socket = useSelector(useSocket);
  // console.log(socket);
  const messages = useSelector(useMessage);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    // console.log(lastMessageRef)
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socket) {
      console.log("socket_id",socket.id)
      dispatch(
        emitMesseges({
          sender_id,
          receiver_id,
        })
      );
    }
  }, [dispatch, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("response", (data) => {
        // console.log("Received response:", data);

        if (data?.object_type === "get_all_messages") {
          // console.log("get_all_messages", data);
          // setMessages(data?.data);
          dispatch(setMessages(data?.data));
        } else if (data?.object_type === "get_message") {
          console.log("get_message", data.data);
          // setMessages((prev) => [...prev, data?.data]);
          dispatch(addMessage(data?.data));
        }
      });
      return () => {
        socket.off("response");
      };
    }
  }, [dispatch, socket]);

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
                <h1>Live Chat : {receiverName}</h1>
              </div>
              <div className="chat-body">
                {messages.map((msg, i) => {
                  return (
                    <Fragment key={i}>
                      <div
                        className="message"
                        id={sender_id === msg?.sender_id._id ? "you" : "other"}
                        ref={lastMessageRef}
                      >
                        <div className="d-flex">
                          <div className="message-content">
                            <p>{msg.message}</p>
                          </div>
                          <img
                            src={`${import.meta.env.VITE_API_URL}${
                              msg?.sender_id?.image
                            }`}
                            alt={msg?.sender_id?.name}
                            width={50}
                            height={50}
                            id="chat-img"
                          />
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
                  onKeyDown={(e) => {
                    e.key === "Enter" && sendMessage(e);
                  }}
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

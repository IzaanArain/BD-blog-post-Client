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
  const receiver_id = location?.state?.receiver_id;
  const dispatch = useDispatch();
  const socket = useSelector(useSocket);
  // console.log(socket);
  const messages = useSelector(useMessage);
  useEffect(() => {
    if (socket) {
      dispatch(
        emitMesseges({
          sender_id,
          receiver_id,
        })
      );
    }
  }, [dispatch, socket]);

  useEffect(() => {
    let mount=true
    if(mount){
      if (socket) {
        socket.on("response", (data) => {
          if (data?.object_type === "get_all_messages") {
            console.log("get_all_messages",data)
            // setMessages(data?.data);
            dispatch(setMessages(data?.data));
          } else if (data?.object_type === "get_message") {
            console.log("get_message",data.data)
            // setMessages((prev) => [...prev, data?.data]);
            dispatch(addMessage(data?.data));
          }
        });
      }
    }
    return ()=>{
      mount=false
    }
  }, [dispatch, socket]);

  // console.log("messages", messages);
  // console.log("currentMessage", currentMessage);
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
                        id={sender_id === msg?.sender_id._id ? "you" : "other"}
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
                  onKeyDown={(e)=>{
                    e.key==="Enter" && sendMessage(e)
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

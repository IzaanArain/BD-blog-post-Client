import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import NoImage from "../assets/NoImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../features/Messages/MessageSlice";
import { loggedInUser } from "../features/Auth/Auth";
import { useNavigate } from "react-router-dom";
const UserCard = ({ user }) => {
  const { name, email, image, _id } = user;
  const dispatch = useDispatch();
  const socket = useSelector(useSocket);
  const sender = useSelector(loggedInUser);
  const sender_id = sender?._id;
  const navigate=useNavigate();

  const getChat = (e) => {
    e.preventDefault();
    // console.log(socket)
    // console.log("sender_id",sender_id)
    // console.log("reciever_id",_id)
    socket.emit("get_all_messages", { sender_id: sender_id, receiver_id: _id });
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          width={100}
          height={180}
          src={image ? `${import.meta.env.VITE_API_URL}${image}` : NoImage}
        />
        <Card.Body>
          <Card.Title>{email}</Card.Title>
          <Card.Text>Name : {name}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={(e)=>{
             getChat(e)
            navigate("/chat")
          }}>...start Chatting</Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default UserCard;

import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import DefaultImage from "../assets/NoImage.jpg"
import { useDispatch,useSelector } from "react-redux";
import { useSocket } from "../features/Messages/MessageSlice";
import { loggedInUser } from "../features/Auth/Auth";

const UserCard = ({ user }) => {
  const { name, email, image,_id } = user;
  const dispatch=useDispatch();
  const socket=useSelector(useSocket)
  const sender=useSelector(loggedInUser);
  const sender_id=sender?._id;

  const getChat=(e)=>{     
    e.preventDefault();
    // console.log(socket)
    // console.log("sender_id",sender_id)
    // console.log("reciever_id",_id)
    socket.emit("get_all_messages",{sender_id:sender_id,receiver_id:_id})
  }
  
  return (
    <>
      <div onClick={getChat}>
        <Card className="mb-3 p-2">
          <Row>
            <Col
              lg={3}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src={image ? `${import.meta.env.VITE_API_URL}${image}` : DefaultImage}
                // onError={(e) => {
                //   e.target.src = DefaultImage
                // }}
                roundedCircle
                className="border border-dark"
                width={100}
                height={100}
              />
            </Col>
            <Col lg={9}>
              <Card.Body>
                <Card.Title>{email}</Card.Title>
                <Card.Text>Name : {name}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default UserCard;

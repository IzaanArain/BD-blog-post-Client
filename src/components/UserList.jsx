import Container from "react-bootstrap/Container";
import { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserCard from "./UserCard";
import { getAllUsers, getAllUsersApi } from "../features/Chat/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "../features/Auth/Auth";
import CardGroup from "react-bootstrap/CardGroup";
const UserList = () => {
  const dispatch = useDispatch();
  const user = useSelector(loggedInUser);
  const user_id = user?._id;

  useEffect(() => {
    let mount = true;
    if (mount) {
      dispatch(getAllUsersApi());
    }
    return () => {
      mount = false;
    };
  }, []);

  const userList = useSelector(getAllUsers);
  return (
    <>
      <Row xs={1} md={2} lg={4} className="g-4">
        {userList.map((user, i) => {
          const id = user?._id;
          if (user_id !== id) {
            return (
              <Col key={i}>
                <UserCard user={user} />
              </Col>
            );
          }
        })}
      </Row>
    </>
  );
};

export default UserList;

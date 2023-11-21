import Container from "react-bootstrap/Container";
import { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserCard from "./UserCard";
import { getAllUsers, getAllUsersApi } from "../features/Chat/ChatSlice";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersApi());
  }, [dispatch]);

  const userList = useSelector(getAllUsers);
  return (
    <>
      <div className="user-list">
      {userList.map((user, i) => {
        return (
          <>
              <div className="my-3">
              <UserCard user={user}/>
              </div>
          </>
        );
      })}
      </div>
    </>
  );
};

export default UserList;

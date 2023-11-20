import Container from "react-bootstrap/Container";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserCard from "./UserCard";
import {getAllUsers} from "../features/Chat/ChatSlice"
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const dispatch=useDispatch();
  const users=useSelector(getAllUsers)
  console.log(users)
  return (
    <>
      <h1>users</h1>
      <UserCard/>
    </>
  );
};

export default UserList;

import Container from "react-bootstrap/Container";
import { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserCard from "./UserCard";
import { getAllUsers, getAllUsersApi } from "../features/Chat/ChatSlice";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const dispatch = useDispatch();
  const userList = useSelector(getAllUsers);

  useEffect(() => {
    dispatch(getAllUsersApi());
  }, [dispatch]);
  return (
    <>
      {userList.map((user, i) => {
        return (
          <>
            <Fragment key={i}>
              <div className="my-3">
              <UserCard user={user}/>
              </div>
            </Fragment>
          </>
        );
      })}
    </>
  );
};

export default UserList;

import Container from "react-bootstrap/Container";
import { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserCard from "./UserCard";
import { getAllUsers, getAllUsersApi } from "../features/Chat/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "../features/Auth/Auth";
const UserList = () => {
  const dispatch = useDispatch();
  const user=useSelector(loggedInUser);
  const user_id=user?._id
  useEffect(() => {
    dispatch(getAllUsersApi());
  }, [dispatch]);

  const userList = useSelector(getAllUsers);
  return (
    <>
      <div className="user-list">
      {userList.map((user, i) => {
        const id=user?._id
        if(user_id!==id){
          return (
            <Fragment key={i}>
                <div className="my-3">
                <UserCard user={user}/>
                </div>
            </Fragment>
          );
        }
      })}
      </div>
    </>
  );
};

export default UserList;

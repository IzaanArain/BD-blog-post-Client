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
    let mount = true
    if(mount){
      dispatch(getAllUsersApi());
    }
    return () => {
      mount = false
  }
  }, []);

  const userList = useSelector(getAllUsers);
  return (
    <>
      <div className="d-flex flex-wrap">
      {userList.map((user, i) => {
        const id=user?._id
        if(user_id!==id){
          return (
            <Fragment key={i}>
                <UserCard user={user}/>
            </Fragment>
          );
        }
      })}
      </div>
    </>
  );
};

export default UserList;

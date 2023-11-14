import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NavBar from "./NavBar";
import UserList from "./UserList";
import useAuthState from "../hooks/UseAuthState";
import { Navigate } from "react-router-dom";

const Layout = () => {
  const user = useAuthState();
  const token = user?.user_auth;
  // console.log("token", token);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        {token ? (
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="*" element={<Navigate to="/users" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default Layout;

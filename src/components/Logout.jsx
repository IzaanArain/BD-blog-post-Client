import { logout } from "../features/Auth/Auth";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
const Logout = () => {
    const dispatch=useDispatch();

    const logoutAction=(e)=>{
        e.preventDefault();
        dispatch(logout());
    }
  return (
    <>
    <Button onClick={logoutAction} variant="outline-danger" className="mx-3">Logout</Button>
    </>
  )
}

export default Logout
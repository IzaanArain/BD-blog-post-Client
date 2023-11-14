import { logout } from "../features/Auth/Auth";
import { useDispatch } from "react-redux";

const Logout = () => {
    const dispatch=useDispatch()
    const logoutAction=(e)=>{
        e.preventDefault();
        dispatch(logout())
    }
  return (
    <>
    <button>Logout</button>
    </>
  )
}

export default Logout
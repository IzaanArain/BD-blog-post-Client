import { useSelector } from "react-redux";
import { loggedInUser } from "../features/Auth/Auth";

const useAuthState=()=>{
    try{
        const user=useSelector(loggedInUser) ? useSelector(loggedInUser) : null;
        return user
    }catch(err){
        console.error("Error",err.message);
    }
} 

export default useAuthState;
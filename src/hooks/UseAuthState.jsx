import { useSelector } from "react-redux";
import { loggedInUser } from "../features/Auth/Auth";
const useAuthState=()=>{
    try{
        const user=useSelector(loggedInUser);
    }catch(err){
        console.error("Error",err.message);
    }
} 
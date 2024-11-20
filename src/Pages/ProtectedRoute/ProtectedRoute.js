import { useAuthState } from "react-firebase-hooks/auth";
import auth  from "../../firebase.init.js"
import { Navigate } from "react-router-dom";
import PageLoading from "../PageLoading/PageLoading.js";

const ProtectedRoute = ({children}) =>{
 
    const [user, isLoading] = useAuthState(auth);

    if(isLoading){
      return <PageLoading/>
    }

    if(!user){
        return <Navigate to="/login"/>
    }
    return children;

   
}

export default ProtectedRoute;
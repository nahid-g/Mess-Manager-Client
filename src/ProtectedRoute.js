import {useNavigate, Route} from 'react-router-dom'
//import useAuth from 'use-auth'
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = (props)=>{

    const [, auth] = document.cookie.split("=");
    return auth ? <Outlet /> : <Navigate to="/" />;

}

export default ProtectedRoute
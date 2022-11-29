import {CiLogin} from 'react-icons/ci';
import {UserContext} from "../../App";
import {useContext} from "react";
import "./Navbar.css"
import {useNavigate} from "react-router-dom"

export default function Navbar() {

    const navigate = useNavigate()
    const user = useContext(UserContext)
    return (
        <div className={"navbar"}>
            <h3>{user ? user.username : "not logged in"}</h3>
            <p onClick={() => navigate("/")}>home</p>
            <p onClick={() => navigate("/login")}><CiLogin/></p>
            <p onClick={() => navigate("/register")}>register</p>
        </div>
    )

}

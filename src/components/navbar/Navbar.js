import {CiLogin} from 'react-icons/ci';
import {UserContext} from "../../App";
import {useContext} from "react";
import "./Navbar.css"

export default function Navbar() {
    const user = useContext(UserContext)
    return (
        <div className={"navbar"}>
            <h3>{user ? user.username : "not logged in"}</h3>
            <a href={"/login"}><CiLogin/></a>
        </div>
    )

}

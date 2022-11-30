import {CiLogin, CiHome, CiUser, CiSaveUp2, CiSquareQuestion} from 'react-icons/ci';
import {UserContext} from "../../App";
import {useContext, useState} from "react";
import "./Navbar.css"
import {useNavigate} from "react-router-dom"

export default function Navbar() {

    const user = useContext(UserContext)
    const [open, setOpen] = useState(false)

    if (open) {
        return (
            <div className="navbar-container">
                <div className={"navbar open"} onMouseLeave={() => setOpen(false)}>
                    <div className={"user"}>
                        {user ? <CiUser className="icon"/> : <CiSquareQuestion className="icon"/>}
                        <div className="text">{user ? user.username : "no user"}</div>
                    </div>
                    <Link route="/" icon={<CiHome className="icon"/>} text="Home"/>
                    <Link route="/login" icon={<CiLogin className="icon"/>} text="Login"/>
                    <Link route="/register" icon={<CiSaveUp2 className="icon"/>} text="Register"/>
                </div>
            </div>
        )
    }
    return (
        <div className="navbar-container">
            <div className={"navbar"} onMouseEnter={() => setOpen(true)}>
                <div className={"user"}>
                    {user ? <CiUser className="icon"/> : <CiSquareQuestion className="icon"/>}
                </div>
                <Link route="/" icon={<CiHome className="icon"/>} text=""/>
                <Link route="/login" icon={<CiLogin className="icon"/>} text=""/>
                <Link route="/register" icon={<CiSaveUp2 className="icon"/>} text=""/>
            </div>
        </div>
    )

}

function Link({route, icon, text}){
const navigate = useNavigate()
return <div className={"link"} onClick={() =>
    navigate(route)
}
>
{
    icon
}
<div className="text">{text}</div>
</div>
}

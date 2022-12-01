import { useRef, useState } from "react";
import * as api from "../../api";
import "./LoginView.css"
import User from "../../entities/User";
import { useNavigate } from "react-router-dom";


export default function LoginView({ onSuccessfulLogin = (user) => { } }) {
    const navigate = useNavigate()
    const usernameInput = useRef()
    const passwordInput = useRef()
    const [message, setMessage] = useState("")

    const submit = async () => {
        const username = usernameInput.current.value
        const password = passwordInput.current.value

        if (!username || !password) {

            return

        }
        const data = await api.login(username, password)

        if (!data.user) {
            setMessage(data.message)
            return
        }

        onSuccessfulLogin(new User(data.user.username, data.token))
        setMessage("login Successful")

    }
    return (
        <>

            <div className="login_view">
                <h1>User Login</h1>
                <div className="form" onKeyPress={(event) => { if (event.key === "Enter") submit() }}>
                    <input ref={usernameInput} placeholder="username" />
                    <input ref={passwordInput} placeholder="password" type="password" />
                    <button className="submit" onClick={submit}>Login</button>
                    <button onClick={() => navigate("/register")}>Register</button>
                    <div className="message" style={{ display: message ? 'block' : 'none' }}>{message}</div>
                </div>
            </div>
        </>
    )
}



import './App.css';
import {createContext, useEffect, useState} from "react";
import Navbar from "./components/navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import PostsView from "./views/postsView/PostsView";
import LoginView from "./views/loginView/LoginView";
import RegisterView from "./views/registerView/RegisterView";
import {useNavigate} from "react-router-dom"
import User from "./entities/User";

export const UserContext = createContext(null);

function App() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    function loginUser(user) {
        setUser(user)
        navigate("/")
        localStorage.setItem("user", JSON.stringify(user))
    }

    function logoutUser() {
        setUser(null)
        navigate("/login")
        localStorage.removeItem("user")
    }


    useEffect(() => {
        const rawUser = localStorage.getItem("user")
        if (rawUser){
            const jsonUser = JSON.parse(rawUser)
            loginUser(new User(jsonUser.username, jsonUser.token))
        }
    }, [])

    return (
        <UserContext.Provider value={user}>
            <div className={"app"}>
                <Navbar/>
                <Routes>
                    <Route index element={<PostsView on401={logoutUser}/>}/>
                    <Route path="/login" element={<LoginView onSuccessfulLogin={loginUser}/>}/>
                    <Route path="/register" element={<RegisterView/>}/>
                </Routes>
            </div>
        </UserContext.Provider>
    );
}

export default App;

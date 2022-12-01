import './App.css';
import {createContext, useEffect, useState} from "react";
import Navbar from "./components/navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import PostsView from "./views/postsView/PostsView";
import LoginView from "./Login/LoginView";
import RegisterView from "./views/registerView/RegisterView";
import {useNavigate} from "react-router-dom"

export const UserContext = createContext(null);

function App() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    function loginUser(user) {
        setUser(user)
        navigate("/")
        localStorage.setItem("user", JSON.stringify(user))
    }


    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user){
            setUser(JSON.parse(user))
        }
    }, [])

    return (
        <UserContext.Provider value={user}>
            <div className={"app"}>
                <Navbar/>
                <Routes>
                    <Route index element={<PostsView/>}/>
                    <Route path="/login" element={<LoginView onSuccessfulLogin={loginUser}/>}/>
                    <Route path="/register" element={<RegisterView/>}/>
                </Routes>
            </div>
        </UserContext.Provider>
    );
}

export default App;

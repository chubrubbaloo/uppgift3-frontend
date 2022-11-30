import './App.css';
import {createContext, useState} from "react";
import Navbar from "./components/navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import PostsView from "./views/postsView/PostsView";
import LoginView from "./Login/LoginView";
import RegisterComponent from "./RegisterComponent";
import {useNavigate} from "react-router-dom"

export const UserContext = createContext(null);

function App() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    function loginUser(user) {
        setUser(user)
        navigate("/")
    }

    return (
        <UserContext.Provider value={user}>
            <div className={"app"}>
                <Navbar/>
                <Routes>
                    <Route index element={<PostsView/>}/>
                    <Route path="/login" element={<LoginView onSuccessfulLogin={loginUser}/>}/>
                    <Route path="/register" element={<RegisterComponent/>}/>
                </Routes>
            </div>
        </UserContext.Provider>
    );
}

export default App;

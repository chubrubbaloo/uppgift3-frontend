import './App.css';
import {createContext, useState} from "react";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ViewPosts from "./views/viewPosts/ViewPosts";
import LoginView from "./Login/LoginView";

export const UserContext = createContext(null);

function App() {
    const [user, setUser] = useState(null)
    return (
        <BrowserRouter >
            <UserContext.Provider value={user}>
                <div className={"app"}>
                    <Navbar/>
                    <Routes>
                        <Route index element={<ViewPosts/>}/>
                        <Route path="/login" element={<LoginView onSuccessfulLogin={setUser}/>}/>
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;

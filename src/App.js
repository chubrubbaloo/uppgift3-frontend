import './App.css';
import {createContext} from "react";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ViewPosts from "./views/viewPosts/ViewPosts";

export const UserContext = createContext(null);

function App() {
    //const [user, setUser] = useState(null)
    return (
        <BrowserRouter >
            <UserContext.Provider value={null}>
                <div style={{
                    display: "flex",
                    height: "100vh",
                    width: "100vw"
                }}>
                    <Navbar/>
                    <Routes>
                        <Route index element={<ViewPosts/>}/>
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;

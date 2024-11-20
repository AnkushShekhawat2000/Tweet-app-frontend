import React from "react"
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute.js"
import PageLoading from "./Pages/PageLoading/PageLoading.js"
import "../src/App.css"
import Home from "./Main/Home.js"
import Login from "./Pages/LandingPage/Login.js"
import Signup from './Pages/LandingPage/Signup.js';
import Feed from "./Main/Feed/Feed.js"
import Explore from "./Pages/Explore/Explore.js"
import Notifications from "./Pages/Notifications/Notifications";
import Messages from "./Pages/Messages/Messages"
import Bookmarks from "./Pages/Bookmarks/Bookmarks.js"
import Lists from "./Pages/Lists/Lists"
import Profile from "./Pages/Profile/Profile"
import More from "./Pages/More/More.js"
import { UserauthcontextProvider } from "./context/UserAuthContext.js";

function App() {
  return (
    <div className="App">
    <UserauthcontextProvider>
      <BrowserRouter>
         <Routes>    
            <Route path="/" element={<Home/>}>
               <Route index path="/feed" element={<Feed/>}/>
            </Route>
            <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}>
               <Route index path="feed" element={<Feed/>}/>
               <Route path="explore" element={<Explore/>}/>
               <Route path="notifications" element={<Notifications/>}/>
               <Route path="messages" element={<Messages/>}/>
               <Route path="bookmarks" element={<Bookmarks/>}/>
               <Route path="lists" element={<Lists/>}/>
               <Route path="profile" element={<Profile/>}/>
               <Route path="more" element={<More/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/> 
          </Routes>
      </BrowserRouter>
      </UserauthcontextProvider>  
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
   return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
   return (
      <BrowserRouter>
         <Nav />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
               path="/profile"
               element={
                  <ProtectedRoute>
                     <Profile />
                  </ProtectedRoute>
               }
            />
         </Routes>
         <Footer />
      </BrowserRouter>
   );
}

export default App;

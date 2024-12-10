import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
   return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

function App() {
   return (
      <BrowserRouter>
         <Nav />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route
               path="/users"
               element={
                  <ProtectedRoute>
                     <Users />
                  </ProtectedRoute>
               }
            />
         </Routes>
         <Footer />
      </BrowserRouter>
   );
}

export default App;

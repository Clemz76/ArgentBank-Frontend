import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import SignIn from "./pages/SignIn";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
   return (
      <BrowserRouter>
         <Nav />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sign-in" element={<SignIn />} />
         </Routes>
         <Footer />
      </BrowserRouter>
   );
}

export default App;

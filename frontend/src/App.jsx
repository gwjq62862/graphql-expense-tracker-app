import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import HomePage from "./page/HomePage";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import Transaction from "./page/Transaction";
import NotFound from "./page/NotFound";
import { Toaster } from "react-hot-toast";

// Move Protected component outside App to avoid redefinition on each render
const Protected = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing user data:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Protected user={user}><HomePage /></Protected>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/transaction/:id" element={<Protected user={user}><Transaction /></Protected>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const apiURL = process.env.REACT_APP_API_URL;
          const { data } = await axios.post(`${apiURL}api/auth/validate`, {
            token: storedToken,
          });
          // console.log("Token validation response:", data, data.data.verified);
          setUser(data.data.verified); 
        } catch (error) {
          console.error("Token validation error:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false); 
    };

    validateToken();
  }, []);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Main /> : <Navigate replace to="/login" />} />
      <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
    </Routes>
  );
}


export default App;

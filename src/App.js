import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPost from "./pages/AddPost";
import UpdatePost from "./pages/UpdatePost";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./routes/PrivateRoute";
import AuthProvider from "./context/AuthContext";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add" element={<PrivateRoute element={<AddPost />} />} />
        <Route
          path="/update/:id"
          element={<PrivateRoute element={<UpdatePost />} />}
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;

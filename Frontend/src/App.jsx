import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token"); // ✅ check token here

  return (
    <BrowserRouter>
      <div className="bg-slate-400 h-screen w-screen flex justify-center items-center">
        <Routes>
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/dashboard" /> : <Register />}
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

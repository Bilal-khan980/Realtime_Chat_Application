import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-slate-400 h-screen w-screen flex justify-center items-center">
          <Routes>
            <Route path="/Dashboard" element></Route>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />}></Route>

            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

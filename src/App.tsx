import "./App.css";
import Login from "./pages";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/404";
import { Route, Routes } from "react-router-dom";
import Mission from "./pages/mission";
import Inspetion from "./pages/inspetion";

function App() {
  return (
    <>
      <Routes> {/* Local das rotas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/insp" element={<Inspetion />} />
      </Routes>
    </>
  );
}

export default App;

import "./App.css";
import Login from "./pages";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/404";
import { Route, Routes } from "react-router-dom";
import Mission from "./pages/mission";
import Inspetion from "./pages/inspetion";
import Approver from "./pages/approver";
import Driver from "./pages/driver";
import Manager from "./pages/manager";
import Sender from "./pages/sender";
import Reserve from "./pages/driver/reservarVeiculo";
import Request from "./pages/driver/solicitarVeiculo";
import ListarVeiculos from "./pages/approver/listarVeiculos";
import CardsList from "./pages/approver/listarSolicitacoesVeiculos";
import ReturnSheets from "./pages/approver/fichaRetorno";

function App() {
  return (
    <>
      <Routes> {/* Local das rotas */}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/driver/reservar-veiculo" element={<Reserve />} />
        <Route path="/driver/solicitar-veiculo" element={<Request />} />
        <Route path="/approver" element={<Approver />} />
        <Route path="/approver/solicitar-veiculos" element={<CardsList />} />
        <Route path="/approver/listar-veiculos" element={<ListarVeiculos />} />
        <Route path="/approver/fichas-retorno" element={<ReturnSheets />} />
        <Route path="/manager" element={<Manager />} />
        {/* <Route path="/manager/list-users" element={<Manager />} />
        <Route path="/manager/aprove-requests" element={<Manager />} /> */}
        <Route path="/sender" element={<Sender />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/insp" element={<Inspetion />} />
      </Routes>
    </>
  );
}

export default App;

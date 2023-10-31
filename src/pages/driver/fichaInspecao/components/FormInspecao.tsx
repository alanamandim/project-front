import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const InspecaoForm = () => {
  const [oleo, setOleo] = useState(true);
  const [pneu, setPneu] = useState(true);
  const [agua, setAgua] = useState(true);
  const [amassado, setAmassado] = useState(true);
  const [arranhado, setArranhado] = useState(true);

  const [tanque, setTanque] = useState("");
  const [obs, setObs] = useState("");
  const [idSolicitacao, setIdSolicitacao] = useState(0);
  const url = "http://localhost:8080";

  useEffect(() => {
    // Obtenha o objeto user do localStorage
    const storedIdSolicitacao = localStorage.getItem("idSolicitacao");

    if (storedIdSolicitacao) {
      // Parse o objeto do localStorage para um objeto JavaScript
      const parsedUser = JSON.parse(storedIdSolicitacao);

      // Defina o objeto user no estado
      setIdSolicitacao(parsedUser);
    }

    getInfo();
  }, []);

  const getInfo = async () => {
    const response = await fetch(
      // FIXME: Change the URL to get tanque selects
      url + "/listaViaturasDisponiveis/",
      {
        method: "GET",
        // FIXME: Check if the post method is correct
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(url + "/listaViaturasDisponiveis", data);

      toast.success(`Requisição enviada!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // FIXME: Change the state than will receive the value
      setAvailableVehicles(data);
    }
  }

  const sendInfo = async () => {

    // FIXME: Check if this method is correctly
    const data = {
      oleo,
      pneu,
      agua,
      amassado,
      arranhado,
      tanque,
      obs,
      idSolicitacao,
    };

    try {
      const response = await fetch(url + "/adicionaInspecao", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("Dados enviados com sucesso.");
        <Navigate to="/adicionaInspecao" />;
      } else {
        console.error(
          "Erro ao enviar os dados. Código de status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
    }
  };

  return idSolicitacao ? (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={oleo}
              onChange={(e) => setOleo(e.target.checked)}
            />
          }
          label="Óleo"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={pneu}
              onChange={(e) => setPneu(e.target.checked)}
            />
          }
          label="Pneu"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agua}
              onChange={(e) => setAgua(e.target.checked)}
            />
          }
          label="Água"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={amassado}
              onChange={(e) => setAmassado(e.target.checked)}
            />
          }
          label="Amassado"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={arranhado}
              onChange={(e) => setArranhado(e.target.checked)}
            />
          }
          label="Arranhado"
        />
      </FormGroup>
      <Grid item mb={3}>
        <FormLabel htmlFor="tanque">Tanque</FormLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          name="tanque"
          label="tanque"
          value={tanque}
          onChange={(e) => setTanque(e.target.value)}
        >
          {/* FIXME: Check if this getting values is correctly */}
          {/* FIXME: Change null to new state than has a GET value */}
          {null &&
            Object.keys(null).map((key) => (
              <MenuItem
                key={key}
                value={null[key].placa}
                onClick={() => setVehicle(null[key].placa)}
              >
                {null[key].modelo} - {null[key].placa}
              </MenuItem>
            ))}
        </Select>
      </Grid>
      <Grid item mb={3}>
        <FormLabel htmlFor="obs">OBS</FormLabel>
        <TextField
          id="obs"
          name="obs"
          fullWidth
          value={obs}
          onChange={(e) => setObs(e.target.value)}
        />
      </Grid>
      <Grid item mb={3}>
        <FormLabel htmlFor="idSolicitacao">Id da Solicitação</FormLabel>
        <TextField
          id="idSolicitacao"
          disabled
          name="idSolicitacao"
          fullWidth
          value={idSolicitacao}
        />
      </Grid>
      <button onClick={sendInfo}>Enviar</button>
    </div>
  ) : (
    toast.error(`Crie a Solicitação primeiro!`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  );
};

export default InspecaoForm;

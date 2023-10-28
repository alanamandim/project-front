import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const InspecaoForm = () => {
  const [oleo, setOleo] = useState(true);
  const [pneu, setPneu] = useState(true);
  const [agua, setAgua] = useState(true);
  const [amassado, setAmassado] = useState(true);
  const [arranhado, setArranhado] = useState(true);

  const [tanque, setTanque] = useState('');
  const [obs, setObs] = useState('');
  const [idSolicitacao, setIdSolicitacao] = useState('');

  const sendInfo = async () => {
    // FIXME: Check if this method is correctly
    const url = "http://localhost:8080";
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
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("Dados enviados com sucesso.");
        <Navigate to="/adicionaInspecao" />
      } else {
        console.error("Erro ao enviar os dados. Código de status:", response.status);
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
    }
  };

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={oleo} onChange={(e) => setOleo(e.target.checked)} />}
          label="Óleo"
        />
        <FormControlLabel
          control={<Checkbox checked={pneu} onChange={(e) => setPneu(e.target.checked)} />}
          label="Pneu"
        />
        <FormControlLabel
          control={<Checkbox checked={agua} onChange={(e) => setAgua(e.target.checked)} />}
          label="Água"
        />
        <FormControlLabel
          control={<Checkbox checked={amassado} onChange={(e) => setAmassado(e.target.checked)} />}
          label="Amassado"
        />
        <FormControlLabel
          control={<Checkbox checked={arranhado} onChange={(e) => setArranhado(e.target.checked)} />}
          label="Arranhado"
        />
      </FormGroup>
      <Grid item mb={3}>
        <FormLabel htmlFor="tanque">Tanque</FormLabel>
        <TextField id="tanque" name="tanque" fullWidth value={tanque} onChange={(e) => setTanque(e.target.value)} />
      </Grid>
      <Grid item mb={3}>
        <FormLabel htmlFor="obs">OBS</FormLabel>
        <TextField id="obs" name="obs" fullWidth value={obs} onChange={(e) => setObs(e.target.value)} />
      </Grid>
      <Grid item mb={3}>
        <FormLabel htmlFor="idSolicitacao">Id da Solicitação</FormLabel>
        <TextField
          id="idSolicitacao"
          name="idSolicitacao"
          fullWidth
          value={idSolicitacao}
          onChange={(e) => setIdSolicitacao(e.target.value)}
        />
      </Grid>
      <button onClick={sendInfo}>Enviar</button>
    </div>
  );
};

export default InspecaoForm;

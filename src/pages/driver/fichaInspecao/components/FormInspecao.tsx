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
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

const InspecaoForm: any = () => {
  const [oleo, setOleo] = useState(true);
  const [pneu, setPneu] = useState(true);
  const [agua, setAgua] = useState(true);
  const [amassado, setAmassado] = useState(true);
  const [arranhado, setArranhado] = useState(true);

  const [tanque, setTanque] = useState("");
  const [tanqueValues, setTanqueValues] = useState("");
  const [obs, setObs] = useState("");
  const [idSolicitacao, setIdSolicitacao] = useState(null);
  const url = "http://localhost:8080";
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const storedIdSolicitacao = localStorage.getItem("idSolicitacao");
    if (storedIdSolicitacao) {
      const parsedUser = JSON.parse(storedIdSolicitacao);
      setIdSolicitacao(parsedUser);
    } else {
      getSolicitacaoId();
    }
    getInfo();
  }, []);

  const getSolicitacaoId = async () => {
    const response = await fetch(
      url + `/listaSolicitacaoInspecao/${user.saram}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setIdSolicitacao(data.idSolicitacao);
      toast.success(`Lista montada!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Algo deu errado!");
    }
  };

  const getInfo = async () => {
    const response = await fetch(url + "/listaTanque", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();

      setTanqueValues(data);
    }
  };

  const sendInfo = async () => {
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
        toast.success(`Inspeção enviada!`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIdSolicitacao(null);
      } else if (response.status == 400) {
        toast.error(
          `Não pode fazer inspeção sem aprovação da solicitação: ${response.status}`,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
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
          {tanqueValues &&
            Object.keys(tanqueValues).map((key, index) => (
              <MenuItem
                key={key}
                value={tanqueValues[index]}
                onClick={() => setTanque(tanqueValues[index])}
              >
                {tanqueValues[index]}
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
  ) : null;
};

export default InspecaoForm;

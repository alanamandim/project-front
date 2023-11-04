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
import { useEffect, useState, useContext } from "react";
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

  const url = "http://localhost:8080";
  const { user, idSolicitacao, setIdSolicitacao, getSolicitacaoId } =
    useContext(AuthContext);

  useEffect(() => {
    // const storedIdSolicitacao = localStorage.getItem("idSolicitacao");
    if (!idSolicitacao) {
      // Parse o objeto do localStorage para um objeto JavaScript
      getSolicitacaoId(user.saram);
      // Defina o objeto user no estado
    } else {
      getInfo();
    }
  }, []);

  const getInfo = async () => {
    const response = await fetch(
      // FIXME: Change the URL to get tanque selects
      url + "/listaTanque",
      {
        method: "GET",
        // FIXME: Check if the post method is correct
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(url + "/listaTanque", data);

      // FIXME: Change the state than will receive the value
      setTanqueValues(data);
    }
  };

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

    console.log(data);

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
          {/* FIXME: Check if this getting values is correctly */}
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

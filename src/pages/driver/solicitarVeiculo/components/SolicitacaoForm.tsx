import { useContext, useEffect, useState } from "react";
import FormLabel from "@mui/material/FormLabel";

import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { AuthContext, IViatura } from "../../../../context/AuthContext";

const SolicitacaoForm = () => {
  // FIXME: Fix the route
  const url = "http://localhost:8080";

  const [motivo, setReason] = useState("");
  const [destino, setDestiny] = useState("");
  const [viatura, setVehicle] = useState("");
  const [motorista, setSaram] = useState("");
  const [availableVehicles, setAvailableVehicles] = useState<
    Record<string, IViatura>
  >({});

  const userContext = useContext(AuthContext);

  async function sendInfo() {
    const formData = { motivo, destino, viatura, motorista };
    console.log(formData);
    const response = await fetch(url + "/", {
      method: "POST",
      // FIXME: Check if the post method is correct
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(url + "/listaSituacaoViaturas", [
        motivo,
        destino,
        viatura,
        motorista,
      ]);
      toast.success(`Requisição enviada!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  useEffect(() => {
    getVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getVehicles() {
    const response = await fetch(
      url + "/listaViaturasDisponiveis/" + userContext.user.saram,
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

      setAvailableVehicles(data);
    }
  }

  function getValuesFromForm() {
    const inputElementReason = document.getElementById(
      "motivo"
    ) as HTMLInputElement | null;
    if (inputElementReason !== null) {
      const formReason = inputElementReason.value;
      setReason(formReason);
    }

    const inputElementDestiny = document.getElementById(
      "destino"
    ) as HTMLInputElement | null;
    if (inputElementDestiny !== null) {
      const formDestiny = inputElementDestiny.value;
      setDestiny(formDestiny);
    }

    const inputElementSaram = document.getElementById(
      "saram"
    ) as HTMLInputElement | null;
    if (inputElementSaram !== null) {
      const formSaram = inputElementSaram.value;
      setSaram(formSaram);
    }
  }

  return (
    <form onChange={getValuesFromForm}>
      <Grid
        item
        container
        columnSpacing={2}
        mt={2}
        direction="column"
        justifyContent="center"
      >
        <Grid item mb={3}>
          <FormLabel htmlFor="motivo">Motivo</FormLabel>
          <TextField id="motivo" name="motivo" fullWidth value={motivo} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="destino">Destino</FormLabel>
          <TextField id="destino" name="destino" fullWidth value={destino} />
        </Grid>
        <Grid item mb={3}>
          <InputLabel id="demo-select-small-label">Viatura</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            name="viatura"
            label="viatura"
            value={viatura}
            onChange={(e) => setVehicle(e.target.value)}
          >
            {/* FIXME: Check if this getting values is correctly */}
            {availableVehicles &&
              Object.keys(availableVehicles).map((key) => (
                <MenuItem
                  key={key}
                  value={availableVehicles[key].placa}
                  onClick={() => setVehicle(availableVehicles[key].placa)}
                >
                  {availableVehicles[key].modelo} -{" "}
                  {availableVehicles[key].placa}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="saram">Saram</FormLabel>
          <TextField
            disabled
            id="saram"
            name="saram"
            fullWidth
            value={userContext.user.saram}
          />
        </Grid>
        <Grid item mb={3} alignItems="center">
          <Button variant="contained" size="large" onClick={sendInfo}>
            SOLICITAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SolicitacaoForm;

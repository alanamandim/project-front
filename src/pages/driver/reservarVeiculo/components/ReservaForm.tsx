import FormLabel from "@mui/material/FormLabel";

import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const ReservaForm = () => {
  // FIXME: Fix the route
  const url = "http://localhost:8080/adicionaReserva";

  const [reason, setReason] = useState("");
  const [dtHrIni, setDtHrIni] = useState("");
  const [dtHrFim, setDtHrFim] = useState("");
  const [driver, setDriver] = useState("");
  const [vehicle, setVehicle] = useState("");

  async function sendInfo() {
    const response = await fetch(url, {
      method: "post",
      // FIXME: Check if the post method is correct
      body: JSON.stringify([reason, dtHrIni, dtHrFim, driver, vehicle]),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast.success(`Requisição enviada!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Requisição Errada!`, {
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

  function getValuesFromForm() {
    const inputElementReason = document.getElementById(
      "motivo"
    ) as HTMLInputElement | null;
    if (inputElementReason !== null) {
      const formReason = inputElementReason.value;
      setReason(formReason);
    }

    const inputElementDriver = document.getElementById(
      "motorista"
    ) as HTMLInputElement | null;
    if (inputElementDriver !== null) {
      const formDriver = inputElementDriver.value;
      setDriver(formDriver);
    }

    const inputElementHrInicio = document.getElementById(
      "dataHrInicio"
    ) as HTMLInputElement | null;
    if (inputElementHrInicio !== null) {
      const formInicio = inputElementHrInicio.value;
      setDtHrIni(formInicio);
    }

    const inputElementHrFim = document.getElementById(
      "dataHrFim"
    ) as HTMLInputElement | null;
    if (inputElementHrFim !== null) {
      const formFim = inputElementHrFim.value;
      setDtHrFim(formFim);
    }

    const formVehicle: HTMLSelectElement | null =
      document.querySelector("#vehicle");
    const resultVehicle = formVehicle?.options[formVehicle.selectedIndex].text;

    if (resultVehicle) {
      setVehicle(resultVehicle);
    }
  }

  return (
    <>
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
            <TextField id="motivo" name="motivo" fullWidth value={reason} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel htmlFor="dataHrInicio">Data Hora Inicio</FormLabel>
            <TextField
              id="dataHrInicio"
              name="dataHrInicio"
              fullWidth
              value={dtHrIni}
            />
          </Grid>
          <Grid item mb={3}>
            <FormLabel htmlFor="dataHrFim">Data Hora Fim</FormLabel>
            <TextField
              id="dataHrFim"
              name="dataHrFim"
              fullWidth
              value={dtHrFim}
            />
          </Grid>
          <Grid item mb={3}>
            <InputLabel id="demo-select-small-label">Viatura</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={vehicle}
              label="viatura"
            >
              <MenuItem value="">
                <em>Selecione</em>
              </MenuItem>
              <MenuItem value={"QJA3H32"}>Placa: QJA3H32</MenuItem>
            </Select>
          </Grid>
          <Grid item mb={3}>
            {/* tem que tirar e substituir pelo saram depois! */}
            <FormLabel htmlFor="motorista">Motorista</FormLabel>
            <TextField
              id="motorista"
              name="motorista"
              fullWidth
              value={driver}
            />
          </Grid>
          <Grid item mb={3} alignItems="center">
            <Button variant="contained" size="large" onClick={sendInfo}>
              RESERVAR
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ReservaForm;

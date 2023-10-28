import { useState } from "react";
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

const SolicitacaoForm = () => {

  // FIXME: Fix the route
  const url = "http://localhost:8080";

  const [reason, setReason] = useState('')
  const [destiny, setDestiny] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [saram, setSaram] = useState('')

  async function sendInfo() {
    const response = await fetch(url, {
      method: "POST",
      // FIXME: Check if the post method is correct
      body: JSON.stringify(
        [
          reason,
          destiny,
          vehicle,
          saram
        ]
      ),
      headers: { "Content-Type": "application/json" },
    })

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
    }
  }

  function getValuesFromForm() {
    const inputElementReason = document.getElementById("motivo") as HTMLInputElement | null;
    if (inputElementReason !== null) {
      const formReason = inputElementReason.value;
      setReason(formReason)
    }

    const inputElementDestiny = document.getElementById("destino") as HTMLInputElement | null;
    if (inputElementDestiny !== null) {
      const formDestiny = inputElementDestiny.value;
      setDestiny(formDestiny)
    }

    const formVehicle: HTMLSelectElement | null = document.querySelector("#vehicle");
    const resultVehicle = formVehicle?.options[formVehicle.selectedIndex].text;

    if (resultVehicle) {
      setVehicle(resultVehicle);
    }

    const inputElementSaram = document.getElementById("saram") as HTMLInputElement | null;
    if (inputElementSaram !== null) {
      const formSaram = inputElementSaram.value;
      setSaram(formSaram)
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
          <TextField
            id="motivo"
            name="motivo"
            fullWidth
            value={reason}
          />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="destino">Destino</FormLabel>
          <TextField
            id="destino"
            name="destino"
            fullWidth
            value={destiny}
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
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="saram">Saram</FormLabel>
          <TextField
            id="saram"
            name="saram"
            fullWidth
            value={saram}
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
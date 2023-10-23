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
  const url = "http://localhost:3000";

  const [reason, setReason] = useState("");
  const [driver, setDriver] = useState("");
  const [vehicle, setVehicle] = useState("");

  async function sendInfo() {
    const response = await fetch(url, {
      method: "post",
      // FIXME: Check if the post method is correct
      body: JSON.stringify([reason, driver, vehicle]),
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

    const formVehicle: HTMLSelectElement | null =
      document.querySelector("#vehicle");
    const resultVehicle = formVehicle?.options[formVehicle.selectedIndex].text;

    if (resultVehicle) {
      setVehicle(resultVehicle);
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
          <TextField id="motivo" name="motivo" fullWidth value={reason} />
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
            <MenuItem value={"12"}>Ten</MenuItem>
            <MenuItem value={"13"}>Twenty</MenuItem>
            <MenuItem value={"14"}>Thirty</MenuItem>
          </Select>
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="motorista">Motorista</FormLabel>
          <TextField id="motorista" name="motorista" fullWidth value={driver} />
        </Grid>
        <Grid item mb={3} alignItems="center">
          <Button variant="contained" size="large" onClick={sendInfo}>
            RESERVAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ReservaForm;

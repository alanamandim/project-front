import FormLabel from "@mui/material/FormLabel";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext, IViatura } from "../../../../context/AuthContext";

const ReservaForm = () => {
  const url = "http://localhost:8080";
  const [motivo, setReason] = useState("");
  const [dataHrInicio, setDtHrIni] = useState("");
  const [dataHrFim, setDtHrFim] = useState("");
  const [motorista, setDriver] = useState("");
  const [viatura, setVehicle] = useState("");
  const [availableVehicles, setAvailableVehicles] = useState<
    Record<string, IViatura>
  >({});
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const userContext = useContext(AuthContext);

  async function sendInfo() {
    const formData = { motivo, dataHrInicio, dataHrFim, motorista, viatura };
    const response = await fetch(url + "/adicionaReserva", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((data) => {
        const userJSON = JSON.stringify(data);
        window.localStorage.setItem("idReserva", userJSON);
        toast.success(`Requisição enviada! Id: ${data}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(`Requisição Errada!`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  useEffect(() => {
    getAvailableVehicles();
  }, []);

  async function getAvailableVehicles() {
    const response = await fetch(url + "/listaSituacaoViaturas", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
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
    } else {
      toast.error(`Ops! Algo deu errado.`, {
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
            <TextField id="motivo" name="motivo" fullWidth value={motivo} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel htmlFor="dataHrInicio">Data Hora Inicio</FormLabel>
            <TextField
              id="dataHrInicio"
              name="dataHrInicio"
              fullWidth
              value={dataHrInicio}
            />
          </Grid>
          <Grid item mb={3}>
            <FormLabel htmlFor="dataHrFim">Data Hora Fim</FormLabel>
            <TextField
              id="dataHrFim"
              name="dataHrFim"
              fullWidth
              value={dataHrFim}
            />
          </Grid>
          <Grid item mb={3}>
            <InputLabel id="demo-select-small-label">Viatura</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="viatura"
              label="viatura"
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            >
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
            <FormLabel htmlFor="motorista">Motorista</FormLabel>
            <TextField
              disabled
              id="motorista"
              name="motorista"
              fullWidth
              value={userContext.user.saram}
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

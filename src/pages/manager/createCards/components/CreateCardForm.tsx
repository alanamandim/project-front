import {
  Button,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IModelo } from "../../../../context/AuthContext";
import { toast } from "react-toastify";

const CreatedCardForm = () => {
  const [placa, setPlaca] = useState<string>('');
  const [chassi, setChassi] = useState<string>('');
  const [tipoCombustivel, setTipoCombustivel] = useState<string>('');
  const [hodometro, setHodometro] = useState<number>(0);
  const [modelo, setModelo] = useState<
    string | Record<string, IModelo>
  >({});
  const [modelSelect, setModelSelect] = useState('')

  async function getModelsFromSelect() {
    const url = "http://localhost:8080";

    // FIXME: Get the real route from select values
    const response = await fetch(url + "/", {
      method: "GET",
      // FIXME: Check if the post method is correct
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(url + "/", data);

      toast.success(`Requisição enviada!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setModelSelect(data);
    }
  }

  useEffect(() => {
    getModelsFromSelect();
  }, [])

  async function postValuesFromForm() {
    const url = "http://localhost:8080";

    const data = {
      placa,
      chassi,
      tipoCombustivel,
      hodometro,
      modelo,
    };

    const response = await fetch(url + "/adicionaViatura", {
      method: "POST",
      // FIXME: Check if the post method is correct
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success(`Viatura adicionada!`, {
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
    const inputElementPlaca = document.getElementById(
      "placa"
    ) as HTMLInputElement | null;
    if (inputElementPlaca !== null) {
      const formPlaca = inputElementPlaca.value;
      setPlaca(formPlaca);
    }

    const inputElementChassi = document.getElementById(
      "chassi"
    ) as HTMLInputElement | null;
    if (inputElementChassi !== null) {
      const formChassi = inputElementChassi.value;
      setChassi(formChassi);
    }

    const inputElementTipoCombustivel = document.getElementById(
      "tipoCombustivel"
    ) as HTMLInputElement | null;
    if (inputElementTipoCombustivel !== null) {
      const formTipoCombustivel = inputElementTipoCombustivel.value;
      setTipoCombustivel(formTipoCombustivel);
    }

    const inputElementHodometro = document.getElementById(
      "hodometro"
    ) as HTMLInputElement | null;
    if (inputElementHodometro !== null) {
      const formHodometro = inputElementHodometro.value;
      const formHodometroNumber = parseInt(formHodometro);
      setHodometro(formHodometroNumber);
    }

    if (placa && chassi && tipoCombustivel && hodometro && modelo) {
      postValuesFromForm();
    } else {
      toast.error(`Faltam dados a serem preenchidos!`, {
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

  return (
    <form>
      <Grid
        item
        container
        columnSpacing={2}
        mt={2}
        direction="column"
        justifyContent="center"
      >
        <Grid item mb={3}>
          <FormLabel htmlFor="placa">Placa</FormLabel>
          <TextField id="placa" name="placa" fullWidth />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="chassi">Chassi</FormLabel>
          <TextField id="chassi" name="chassi" fullWidth />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="tipoCombustivel">Tipo de Combustível</FormLabel>
          <TextField id="tipoCombustivel" name="tipoCombustivel" fullWidth />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="hodometro">Hodometro</FormLabel>
          <TextField id="hodometro" name="hodometro" fullWidth />
        </Grid>
        <Grid item mb={3}>
          <InputLabel id="demo-simple-select-label">Modelo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={modelo}
            label="modelo"
            onChange={(e) => setModelo(e.target.value)}
          >

            {/* FIXME: Change the way the data will appears to user */}
            {
              Object.keys(modelSelect).map((key) => (
                <MenuItem
                  key={key}
                  value={modelSelect[key].modelo}
                >
                  {modelSelect[key].modelo}
                </MenuItem>
              ))
            }
          </Select>
        </Grid>
        <Grid item mb={3} alignItems="center">
          <Button variant="contained" size="large" onClick={() => getValuesFromForm}>
            ENVIAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreatedCardForm;

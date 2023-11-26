import { Button, FormLabel, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const FormCreateModel = () => {
  const [marca, setMarca] = useState<string>("");
  const [modelo, setModelo] = useState<string>("");

  async function postValuesFromForm() {
    const url = "http://localhost:8080";
    const formData = { marca, modelo };

    const response = await fetch(url + "/adicionaModelo", {
      method: "POST",
      // FIXME: Check if the post method is correct
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast.success(`Modelo adicionado!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Ops, algo deu errado!`, {
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
    const inputElementMarca = document.getElementById(
      "marca"
    ) as HTMLInputElement | null;
    if (inputElementMarca !== null) {
      const formMarca = inputElementMarca.value;
      setMarca(formMarca);
    }

    const inputElementModelo = document.getElementById(
      "modelo"
    ) as HTMLInputElement | null;
    if (inputElementModelo !== null) {
      const formModelo = inputElementModelo.value;
      setModelo(formModelo);
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
          <FormLabel htmlFor="marca">Marca</FormLabel>
          <TextField id="marca" name="marca" fullWidth />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="modelo">Modelo</FormLabel>
          <TextField id="modelo" name="modelo" fullWidth />
        </Grid>
        <Grid item mb={3} alignItems="center">
          <Button variant="contained" size="large" onClick={postValuesFromForm}>
            ENVIAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormCreateModel;

import { useState, useContext } from "react";
import FormLabel from "@mui/material/FormLabel";
import { Button, Grid, MenuItem, Select, InputLabel } from "@mui/material";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

const Relatorio = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedVehicle2, setSelectedVehicle2] = useState<string>("");
  const { setRelatorio } = useContext(AuthContext);

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   console.log("Ano selecionado:", selectedVehicle);
  //   console.log("Mês selecionado:", selectedVehicle2);
  // };

  async function getValuesFromForm() {
    const response = await fetch(
      `http://localhost:8080/relatorio/${selectedVehicle}-${selectedVehicle2}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      toast.success(`Registro efetuado com sucesso!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const data = await response.json();
      setRelatorio(data);
      window.location.href = "/sender-relatorio";
    } else if (response.status === 401) {
      toast.error("Ops! Algo está incorreto.");
    } else {
      toast.error("Ops! Algo está incorreto.");
      console.log(response.status);
      console.log(response);
    }
  }

  return (
    <>
      <Grid item mb={3}>
        <form>
          <Grid item mb={3}>
            <FormLabel htmlFor="dia">Selecione o Ano</FormLabel>
            <InputLabel id="demo-select-small-label">Ano</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="ano"
              label="ano"
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value as string)}
            >
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          </Grid>

          <Grid item mb={3}>
            <InputLabel id="demo-select-small-label">
              Selecione o Mês
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="mes"
              label="mes"
              value={selectedVehicle2}
              onChange={(e) => setSelectedVehicle2(e.target.value as string)}
            >
              <MenuItem value="01">Janeiro</MenuItem>
              <MenuItem value="02">Fevereiro</MenuItem>
              <MenuItem value="03">Março</MenuItem>
              <MenuItem value="04">Abril</MenuItem>
              <MenuItem value="05">Maio</MenuItem>
              <MenuItem value="06">Junho</MenuItem>
              <MenuItem value="07">Julho</MenuItem>
              <MenuItem value="08">Agosto</MenuItem>
              <MenuItem value="09">Setembro</MenuItem>
              <MenuItem value="10">Outubro</MenuItem>
              <MenuItem value="11">Novembro</MenuItem>
              <MenuItem value="12">Dezembro</MenuItem>
            </Select>
          </Grid>

          <Grid item mb={3}>
            <Button
              type="submit"
              variant="contained"
              onClick={() => getValuesFromForm()}
            >
              Enviar Formulário
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default Relatorio;

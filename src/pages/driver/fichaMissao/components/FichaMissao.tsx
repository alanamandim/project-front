import { useContext, useEffect, useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

const MissaoFicha = () => {
  // FIXME: Fix the route
  const url = "http://localhost:8080";

  const [data, setArrayData] = useState<any>({});
  const [kmFinal, setKmFinal] = useState<any>(null);
  const [obs, setObs] = useState<string>("");
  const [id, setId] = useState<any>(null);

  const userContext = useContext(AuthContext);

  useEffect(() => {
    // Obtenha o objeto user do localStorage
    const storedIdSolicitacao = localStorage.getItem("idSolicitacao");
    if (storedIdSolicitacao) {
      // Parse o objeto do localStorage para um objeto JavaScript
      const parsedUser = JSON.parse(storedIdSolicitacao);

      // Defina o objeto user no estado
      setId(parsedUser);
    }
  }, []);

  useEffect(() => {
    getVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getVehicles() {
    const response = await fetch(
      url + "/fichaMissao/" + userContext.user.saram,
      {
        method: "GET",
        // FIXME: Check if the post method is correct
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const dataArray = await response.json();
      toast.success(`Ficha Formada com Sucesso!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setArrayData(dataArray);
    } else {
      toast.error(`Algo deu errado com sua Ficha!`, {
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

  async function putFechaFicha() {
    const dataReq = { kmFinal, obs, id };
    const response = await fetch(url + "/fichaFichaMotora/", {
      method: "PUT",
      body: JSON.stringify(dataReq),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast.success(`Ficha Fechada com Sucesso!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.removeItem("idSolicitacao");
    } else {
      toast.error(`Algo deu errado com seu Fechamento!`, {
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
    <>
      <Grid
        item
        container
        columnSpacing={2}
        mt={2}
        direction="column"
        justifyContent="center"
      >
        <Grid item mb={3}>
          <FormLabel>Id da Solicitação</FormLabel>
          <TextField disabled fullWidth value={data.idSolicitacao} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Motivo da Missão</FormLabel>
          <TextField disabled fullWidth value={data.motivoMissao} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Destino</FormLabel>
          <TextField disabled fullWidth value={data.destino} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Viatura</FormLabel>
          <TextField disabled fullWidth value={data.viatura} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Motorista</FormLabel>
          <TextField disabled fullWidth value={data.motorista} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Aprovador</FormLabel>
          <TextField disabled fullWidth value={data.aprovador} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Id do Registro</FormLabel>
          <TextField disabled fullWidth value={data.idRegistro} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Km Inicial</FormLabel>
          <TextField disabled fullWidth value={data.kmInicial} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Data/Hora Saída </FormLabel>
          <TextField disabled fullWidth value={data.dataHrSaida} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Tanque</FormLabel>
          <TextField disabled fullWidth value={data.tanque} />
        </Grid>
        <FormControlLabel
          control={<Checkbox checked={data.oleo} />}
          label="Óleo"
        />
        <FormControlLabel
          control={<Checkbox checked={data.pneu} />}
          label="Pneu"
        />
        <FormControlLabel
          control={<Checkbox checked={data.aguaRadiador} />}
          label="Água do Radiador"
        />
        <FormControlLabel
          control={<Checkbox checked={data.amassado} />}
          label="Amassado"
        />
        <FormControlLabel
          control={<Checkbox checked={data.aranhado} />}
          label="Arranhado"
        />
        <Grid item mb={3}>
          <FormLabel>Observação</FormLabel>
          <TextField disabled fullWidth value={data.observacao} />
        </Grid>
      </Grid>
      <form>
        <Grid item mb={3}>
          <FormLabel htmlFor="obs">Km Final</FormLabel>
          <TextField
            id="kmFinal"
            name="kmFinal"
            fullWidth
            value={kmFinal}
            onChange={(e) => setKmFinal(e.target.value)}
          />
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
          <FormLabel htmlFor="obs">Id da Solicitação</FormLabel>
          <TextField id="id" name="id" disabled fullWidth value={id} />
        </Grid>
        <Button onClick={putFechaFicha}>Fechar Ficha</Button>
      </form>
    </>
  );
};

export default MissaoFicha;

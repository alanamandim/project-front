import { useContext, useEffect, useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import { Grid, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

const MissaoFicha = () => {
  // FIXME: Fix the route
  const url = "http://localhost:8080";

  const [data, setArrayData] = useState<any>({});

  const userContext = useContext(AuthContext);

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
          <FormLabel>Óleo</FormLabel>
          <TextField disabled fullWidth value={data.oleo} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Pneu</FormLabel>
          <TextField disabled fullWidth value={data.pneu} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Água do Radiador</FormLabel>
          <TextField disabled fullWidth value={data.aguaRadiador} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Amassado</FormLabel>
          <TextField disabled fullWidth value={data.amassado} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Arranhado</FormLabel>
          <TextField disabled fullWidth value={data.arranhado} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Tanque</FormLabel>
          <TextField disabled fullWidth value={data.tanque} />
        </Grid>
        <Grid item mb={3}>
          <FormLabel>Observação</FormLabel>
          <TextField disabled fullWidth value={data.observacao} />
        </Grid>
      </Grid>
    </form>
  );
};

export default MissaoFicha;
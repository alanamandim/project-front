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

  const [arrayData, setArrayData] = useState<any>({});
  const [kmFinalP, setKmFinal] = useState<any>(null);
  const [obsP, setObs] = useState<string>("");
  const [id, setId] = useState<any>(null);

  const [oleoCheck, setOleoCheck] = useState<boolean>(false);
  const [pneuCheck, setPneuCheck] = useState<boolean>(false);
  const [radiadorCheck, setRadiadorCheck] = useState<boolean>(false);
  const [aguaRadiadorCheck, setAguaRadiadorCheck] = useState<boolean>(false);
  const [amassadoCheck, setAmassadoCheck] = useState<boolean>(false);
  const [arranhadoCheck, setArranhadoCheck] = useState<boolean>(false);

  const userContext = useContext(AuthContext);

  useEffect(() => {
    // Obtenha o objeto user do localStorage
    const storedIdSolicitacao = localStorage.getItem("idSolicitacao");
    if (storedIdSolicitacao) {
      // Parse o objeto do localStorage para um objeto JavaScript
      const parsedUser = JSON.parse(storedIdSolicitacao);

      // Defina o objeto user no estado
      setId(parsedUser);
    } else {
      getSolicitacaoId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSolicitacaoId = async () => {
    const response = await fetch(
      // FIXME: Change the URL to get tanque selects
      url + `/listaSolicitacaoInspecao/${userContext.user.saram}`,
      {
        method: "GET",
        // FIXME: Check if the post method is correct
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      // FIXME: Change the state than will receive the value
      setId(data.idSolicitacao);
    } else {
      toast.success("Olá, faça a sua primeira solicitação!");
    }
  };

  useEffect(() => {
    getVehicles();

    setOleoCheck(arrayData.oleo);
    setPneuCheck(arrayData.pneu);
    setRadiadorCheck(arrayData.radiador);
    setAguaRadiadorCheck(arrayData.aguaRadiador);
    setAmassadoCheck(arrayData.amassado);
    setArranhadoCheck(arrayData.arranhado);
    setArrayData({ ...arrayData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getVehicles() {
    const response = await fetch(
      url + "/fichaMissao/" + userContext.user.saram,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const dataArray = await response.json();
      console.log(dataArray, "adasddsadsadsadsadsad");
      setArrayData(dataArray);

      toast.success(`Ficha Formada com Sucesso!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
    const kmFinal = parseInt(kmFinalP);
    const obs = `${obsP}. ${arrayData.observacao}`;
    const dataReq = { kmFinal, obs, id, oleoCheck, pneuCheck, radiadorCheck, aguaRadiadorCheck, amassadoCheck, arranhadoCheck };
    console.log(dataReq);
    const response = await fetch(url + "/fechaFichaMotora", {
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
      toast.error(`Algo deu errado com seu Fechamento! ${response.status}`, {
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
            <TextField disabled fullWidth value={arrayData.idSolicitacao} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel>Motivo da Missão</FormLabel>
            <TextField disabled fullWidth value={arrayData.motivoMissao} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel>Destino</FormLabel>
            <TextField disabled fullWidth value={arrayData.destino} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel>Viatura</FormLabel>
            <TextField disabled fullWidth value={arrayData.viatura} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel>Motorista</FormLabel>
            <TextField disabled fullWidth value={arrayData.motorista} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel>Aprovador</FormLabel>
            <TextField disabled fullWidth value={arrayData.aprovador} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel>Id do Registro</FormLabel>
            <TextField disabled fullWidth value={arrayData.idRegistro} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel>Km Inicial</FormLabel>
            <TextField disabled fullWidth value={arrayData.kmInicial} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel>Data/Hora Saída </FormLabel>
            <TextField disabled fullWidth value={arrayData.dataHrSaida} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel>Tanque</FormLabel>
            <TextField disabled fullWidth value={arrayData.tanque} />
          </Grid>
          <FormControlLabel
            control={<Checkbox checked={pneuCheck} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPneuCheck(e.target.checked)} />}
            label="Pneu"
          />
          <FormControlLabel
            control={<Checkbox checked={aguaRadiadorCheck} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAguaRadiadorCheck(e.target.checked)} />}
            label="Água do Radiador"
          />
          <FormControlLabel
            control={<Checkbox checked={amassadoCheck} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmassadoCheck(e.target.checked)} />}
            label="Amassado"
          />
          <FormControlLabel
            control={<Checkbox checked={arranhadoCheck} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArranhadoCheck(e.target.checked)} />}
            label="Arranhado"
          />
          <Grid item mb={3}>
            <FormLabel>Observação</FormLabel>
            <TextField disabled fullWidth value={arrayData.observacao} />
          </Grid>
        </Grid>
      </form>
      <h1>Formulário para Fechar a Ficha</h1>
      <form>
        <Grid item mb={3}>
          <FormLabel htmlFor="obs">Km Final</FormLabel>
          <TextField
            id="kmFinal"
            name="kmFinal"
            fullWidth
            value={kmFinalP}
            onChange={(e) => setKmFinal(e.target.value)}
          />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="obs">OBS</FormLabel>
          <TextField
            id="obs"
            name="obs"
            fullWidth
            value={obsP}
            onChange={(e) => setObs(e.target.value)}
          />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="obs">Id da Solicitação</FormLabel>
          <TextField
            id="id"
            name="id"
            disabled
            fullWidth
            value={arrayData.idSolicitacao}
          />
        </Grid>
        <Button onClick={putFechaFicha}>Fechar Ficha</Button>
      </form>
    </>
  );
};

export default MissaoFicha;

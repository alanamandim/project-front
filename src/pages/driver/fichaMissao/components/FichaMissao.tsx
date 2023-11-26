import { useContext, useEffect, useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import { Button, Grid, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

const MissaoFicha = () => {
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
    const storedIdSolicitacao = localStorage.getItem("idSolicitacao");
    if (storedIdSolicitacao) {
      const parsedUser = JSON.parse(storedIdSolicitacao);
      setId(parsedUser);
    } else {
      getSolicitacaoId();
    }
  }, []);

  const getSolicitacaoId = async () => {
    const response = await fetch(
      url + `/listaSolicitacaoInspecao/${userContext.user.saram}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
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
    const obs = `${arrayData.observacao}. ${obsP}`;
    const dataReq = {
      kmFinal,
      obs,
      id,
      oleoCheck,
      pneuCheck,
      radiadorCheck,
      aguaRadiadorCheck,
      amassadoCheck,
      arranhadoCheck,
    };
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
          <Grid item mb={3}>
            <FormLabel>Pneu: {arrayData.pneu ? "SIM" : "NÃO"}</FormLabel>
          </Grid>
          <Grid item mb={3}>
            <FormLabel>
              Água do Radiador: {arrayData.aguaRadiador ? "SIM" : "NÃO"}
            </FormLabel>
          </Grid>
          <Grid item mb={3}>
            <FormLabel>
              Amassado: {arrayData.amassado ? "SIM" : "NÃO"}
            </FormLabel>
          </Grid>
          <Grid item mb={3}>
            <FormLabel>
              Arranhado: {arrayData.aranhado ? "SIM" : "NÃO"}
            </FormLabel>
          </Grid>
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

import { useState, useEffect } from "react";
import FormLabel from "@mui/material/FormLabel";
import { Button, Grid, MenuItem, Select, InputLabel } from "@mui/material";
import { toast } from "react-toastify";

const Relatorio = () => {
  const [relatorio, setRelatorio] = useState([]);
  const [temRelatorio, setTemRelatorio] = useState(false);
  const [ano, setAno] = useState<string>("");
  const [mes, setMes] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedVehicle2, setSelectedVehicle2] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Ano selecionado:", selectedVehicle);
    console.log("Mês selecionado:", selectedVehicle2);

    setAno(selectedVehicle);
    setMes(selectedVehicle2);

    getValuesFromForm();

    // Adicione lógica para enviar os dados conforme necessário
  };

  async function getValuesFromForm() {
    console.log(ano, mes);

    const response = await fetch(
      `http://localhost:8080/relatorio/${ano}-${mes}`,
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
      setTemRelatorio(true);
    } else if (response.status === 401) {
      toast.error("Ops! Algo está incorreto.");
    } else {
      toast.error("Ops! Algo está incorreto.");
      console.log(response.status);
      console.log(response);
    }
  }

  useEffect(() => {
    // Verifica se temRelatorio mudou (pode adicionar condições adicionais aqui, se necessário)
    if (temRelatorio) {
      // Recarrega a página
      window.location.reload();
    }
  }, [temRelatorio]);

  return (
    <>
      <Grid item mb={3}>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" variant="contained">
              Enviar Formulário
            </Button>
          </Grid>
        </form>
      </Grid>
      {temRelatorio ? (
        <>
          <h1>
            Relatório {ano}-{mes}
          </h1>
          {relatorio.map((item: any) => {
            <>
              <h3>Relatório {item.idSolicitacao}</h3>
              <textarea name="relatorio" id="relatorio">
                Id da Solicitação: {item.idSolicitacao} &#10; Motivo da Missão:{" "}
                {item.motivoMissao} &#10; Destino: {item.destino} &#10; Viatura:{" "}
                {item.viatura} &#10; Motorista: {item.motorista} &#10;
                Aprovador: {item.aprovador} &#10; Id do Registro:{" "}
                {item.idRegistro} &#10; KM Inicial: {item.kmInicial} &#10;
                Status da Missão: {item.statusMissao} &#10; KM Final:{" "}
                {item.kmFinal} &#10; Data/Hora da Saída: {item.dataHrSaida}{" "}
                &#10; Data/Hora da Chegada: {item.dataHrChegada} &#10; Retorno
                do motorista: {item.motoristaRetorno} &#10; Óleo: {item.oleo}{" "}
                &#10; Pneu: {item.pneu} &#10; Água do Radiador:{" "}
                {item.aguaRadiador} &#10; Amassado: {item.amassado} &#10;
                Arranhado: {item.aranhado} &#10; Tanque: {item.tanque} &#10;
                Observação: {item.observacao} &#10; Aprovador de Retorno:{" "}
                {item.aprovadorRetorno} &#10;
              </textarea>
              ;
            </>;
          })}
        </>
      ) : (
        toast.success(`Insira uma data para gerar um relatório`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )}
    </>
  );
};

export default Relatorio;

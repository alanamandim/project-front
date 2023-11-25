import { useState, useContext } from "react";
import FormLabel from "@mui/material/FormLabel";
import { Button, Grid, MenuItem, Select, InputLabel } from "@mui/material";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Relatorio = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedVehicle2, setSelectedVehicle2] = useState<string>("");
  const { relatorio, setRelatorio } = useContext(AuthContext);
  const [showContainerReady, setShowContainerReady] = useState(true);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  async function getValuesFromForm() {
    const response = await fetch(
      `http://localhost:8080/relatorio/${selectedVehicle}-${selectedVehicle2}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(
      `http://localhost:8080/relatorio/${selectedVehicle}-${selectedVehicle2}`
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
      setShowContainerReady(false);
      setRelatorio(data);
    } else if (response.status === 401) {
      toast.error("Ops! Algo está incorreto.");
    } else {
      toast.error("Ops! Algo está incorreto.");
      console.log(response.status);
      console.log(response);
    }
  }

  // eslint-disable-next-line no-lone-blocks
  return (
    <>
      {showContainerReady ? (
        <div>
          <Grid item mb={3}>
            <form onSubmit={(e) => e.preventDefault()}>
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
                  onChange={(e) =>
                    setSelectedVehicle2(e.target.value as string)
                  }
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
        </div>
      ) : (
        <div>
          <h1>Relatório</h1>
          {relatorio.map((item: any) => (
            <React.Fragment key={item.idSolicitacao}>
              <Card sx={{ maxWidth: 345, marginBottom: 10 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      M
                    </Avatar>
                  }
                  title={item.motorista}
                  subheader={`Status da Missão: ${item.statusMissao}`}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Imagem de um Relatório"
                />
                <CardContent>
                  <Typography
                    paragraph
                  >{`Id da Solicitação: ${item.idSolicitacao}`}</Typography>
                  <Typography
                    paragraph
                  >{`Id do Registro: ${item.idRegistro}`}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Typography>{`Mostrar mais ->`}</Typography>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography
                      paragraph
                    >{`Motivo da Missão: ${item.motivoMissao}`}</Typography>
                    <Typography paragraph>
                      {`KM Inicial: ${item.kmInicial}`}
                    </Typography>
                    <Typography paragraph>
                      {`KM Final: ${item.kmFinal}`}
                    </Typography>
                    <Typography paragraph>
                      {`Data/Hora Saída: ${item.dataHrSaida}`}
                    </Typography>
                    <Typography paragraph>
                      {`Data/Hora Chegada: ${item.dataHrChegada}`}
                    </Typography>
                    <Typography paragraph>
                      {`Destino: ${item.destino}`}
                    </Typography>
                    <Typography paragraph>
                      {`Viatura: ${item.viatura}`}
                    </Typography>
                    <Typography paragraph>
                      {`Aprovador: ${item.aprovador}`}
                    </Typography>
                    <Typography paragraph>{`Óleo: ${
                      item.oleo ? "SIM" : "NÃO"
                    }`}</Typography>
                    <Typography paragraph>{`Pneu: ${
                      item.pneu ? "SIM" : "NÃO"
                    }`}</Typography>
                    <Typography paragraph>
                      {`Água Radiador: ${item.aguaRadiador ? "SIM" : "NÃO"}`}
                    </Typography>
                    <Typography paragraph>
                      {`Amassado: ${item.amassado ? "SIM" : "NÃO"}`}
                    </Typography>
                    <Typography paragraph>
                      {`Aranhado: ${item.aranhado ? "SIM" : "NÃO"}`}
                    </Typography>
                    <Typography paragraph>
                      {`Tanque: ${item.tanque}`}
                    </Typography>
                    <Typography paragraph>
                      {`Observação: ${item.observacao}`}
                    </Typography>
                    <Typography paragraph>
                      {`Retorno aprovado por: ${item.aprovadorRetorno}`}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default Relatorio;

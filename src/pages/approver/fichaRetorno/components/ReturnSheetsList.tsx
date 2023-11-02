import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

const ReturnSheetsList = () => {
  // FIXME: Check if this method is correctly
  const url = "http://localhost:8080";

  const [dataGet, setDataGet] = useState([]);
  const { user } = useContext(AuthContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getInfo() {
    const response = await fetch(url + `/fichaStatus`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setDataGet(data);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  async function putInfo(aprovador: string, status: string, id: number) {
    // FIXME: Check if this method is correctly
    const sendData = { aprovador, status, id };
    const response = await fetch(url + `/fechaFichaAprovador`, {
      method: "PUT",
      body: JSON.stringify(sendData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast.success(`Ficha Fechada!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Ficha Fechada!`, {
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
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {/* FIXME: Put the interface of item and NEVER USE ANY */}
        {dataGet.map((item: any) => (
          <li key={`section-${item.id}`}>
            <ul>
              <Card sx={{ maxWidth: 330, marginBottom: 5, marginTop: 2 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://s2-autoesporte.glbimg.com/OkOTAbm8c0hcBorNJK_n5VVN-3g=/0x0:1200x875/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/6/a/sh5QGuQUWsns9zfrqYGQ/fiat-doblo-50.jpg"
                  title="carro"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.motorista}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`
                    Id Solicitação: ${item.idSolicitacao}, 
                    Motivo: ${item.motivoMissao}, 
                    Destino: ${item.destino}, 
                    Viatura: ${item.viatura}, 
                    Aprovador: ${item.aprovador}, 
                    Id do Registro: ${item.idRegistro},
                    Status da Missão: ${item.statusMissao}, 
                    Km Inicial: ${item.kmInicial},
                    Km Final: ${item.kmFinal},
                    Data/Hora Saída: ${item.dataHrSaida}, 
                    Data/Hora Chegada: ${item.dataHrChegada}, 
                    Retorno do Motorista: ${item.motoristaRetorno}, 
                    Óleo: ${item.oleo}, 
                    Pneu: ${item.pneu}, 
                    Água do Radiador: ${item.aguaRadiador}, 
                    Amassado: ${item.amassado}, 
                    Arranhado: ${item.aranhado}, 
                    Tanque: ${item.tanque}, 
                    Observação: ${item.observacao}
                    `}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() =>
                      putInfo(user.saram, "Finalizada", item.idRegistro)
                    }
                  >
                    Fechar Ficha
                  </Button>
                </CardActions>
              </Card>
            </ul>
          </li>
        ))}
      </List>
    </>
  );
};

export default ReturnSheetsList;

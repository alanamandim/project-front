import {
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";

interface Reserva {
  viatura: string;
  statusSolicitacao: string;
  destino: string;
  motivo: string;
  placa: string;
}
interface Solicitacao {
  idSolicitacao: number;
  viatura: string;
  status: string;
  motivo: string;
  destino: string;
  placa: string;
}

const ReservasForm = () => {
  const url = "http://localhost:8080";
  const userContext = useContext(AuthContext);
  const [dataReserva, setDataReserva] = useState<Reserva[]>([]);
  const [dataSolicitacao, setDataSolicitacao] = useState<Solicitacao[]>([]);

  useEffect(() => {
    getInfoSolicitacao();
  }, []);

  async function getInfoSolicitacao() {
    const response = await fetch(
      url + `/listaSolicitacao/${userContext.user.saram}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setDataSolicitacao(data);
    }
  }

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getInfo() {
    const response = await fetch(
      url + `/listaReserva/${userContext.user.saram}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setDataReserva(data);
    }
  }

  async function cancelarPedidoSolicitacao(idSolicitacao: number) {
    const id = idSolicitacao;
    const aprovador = userContext.user.saram;
    const status = "Cancelada";
    const data = { aprovador, status, id };
    const response = await fetch(url + `/modificaStatusSolicitacao`, {
      method: "PUT",
      body: JSON.stringify(data),
      // FIXME: GET THE VALUE TO SEND TO BACKEND AND PUT INSIDE A STRINGIFY
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast.success(`Solicitação Cancelada!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Houve um problema no cancelamento!`, {
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

  async function cancelarPedidoReserva(idReserva: number) {
    const id = idReserva;
    const status = "Cancelada";
    const data = { status, id };
    const response = await fetch(url + `/modificaStatusReserva`, {
      method: "PUT",
      body: JSON.stringify(data),
      // FIXME: GET THE VALUE TO SEND TO BACKEND AND PUT INSIDE A STRINGIFY
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast.success(`Reserva Cancelada!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Houve um problema no cancelamento!`, {
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
        <h1>Solicitações</h1>
        <ul>
          {dataSolicitacao.map((item) => (
            <Card
              sx={{ maxWidth: 330, marginBottom: 5, marginTop: 2 }}
              key={item.destino}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://s2-autoesporte.glbimg.com/OkOTAbm8c0hcBorNJK_n5VVN-3g=/0x0:1200x875/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/6/a/sh5QGuQUWsns9zfrqYGQ/fiat-doblo-50.jpg"
                title="carro"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.viatura}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`
                                        Status da Solicitação: ${item.status} | 
                                        Motivo: ${item.motivo} | 
                                        Destino: ${item.destino} | 
                                        Viatura: ${item.viatura} | 
                                        Placa: ${item.placa}
                                    `}
                </Typography>
                <Button
                  onClick={() => {
                    cancelarPedidoSolicitacao(item.idSolicitacao);
                  }}
                >
                  Cancelar
                </Button>
              </CardContent>
            </Card>
          ))}
        </ul>
        <h1>Reservas</h1>
        <ul>
          {dataReserva.map((item) => (
            <Card
              sx={{ maxWidth: 330, marginBottom: 5, marginTop: 2 }}
              key={item.destino}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://s2-autoesporte.glbimg.com/OkOTAbm8c0hcBorNJK_n5VVN-3g=/0x0:1200x875/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/6/a/sh5QGuQUWsns9zfrqYGQ/fiat-doblo-50.jpg"
                title="carro"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.viatura}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`
                                        Status da Solicitação: ${item.statusSolicitacao} | 
                                        Motivo: ${item.motivo} | 
                                        Viatura: ${item.viatura} | 
                                        Placa: ${item.placa} | 
                                    `}
                </Typography>
                <Button
                  onClick={() => {
                    cancelarPedidoReserva(parseInt(item.destino));
                  }}
                >
                  Cancelar
                </Button>
              </CardContent>
            </Card>
          ))}
        </ul>
      </List>
    </>
  );
};

export default ReservasForm;

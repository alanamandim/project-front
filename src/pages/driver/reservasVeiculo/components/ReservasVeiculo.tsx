// LISTA DOS VEÍCULOS QUE ESTE USUÁRIO RESERVOU E O STATUS DA RESERVA!!!!

import { Card, CardContent, CardMedia, List, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const ReservasForm: any = async () => {
  const url = "http://localhost:8080";
  const userContext = useContext(AuthContext);
  const [dataReserva, setDataReserva] = useState([]);
  const [dataSolicitacao, setDataSolicitacao] = useState([]);

  useEffect(() => {
    async function getSolicitacao(id: string) {
      const response = await fetch(url + `/listaSolicitacao/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setDataSolicitacao(data);
        console.log(url, data);
      }
    }

    getSolicitacao(userContext.user.saram);
  }, [dataSolicitacao]);

  useEffect(() => {
    async function getReserva(id: string) {
      const response = await fetch(url + `/listaReserva/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setDataReserva(data);
        console.log(url, data);
      }
    }

    getReserva(userContext.user.saram);
  }, [dataReserva]);

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
        <ul>
          {dataSolicitacao?.map((item: any) => (
            <Card sx={{ maxWidth: 330, marginBottom: 5, marginTop: 2 }}>
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
                  Status da Solicitação: ${item.statusSolicitacao}
                  Motivo: ${item.motivo}
                  Destino: ${item.destino}
                  Viatura: ${item.viatura}
                  Placa: ${item.placa}
                  `}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </ul>
        <ul>
          {dataReserva?.map((item: any) => (
            <Card sx={{ maxWidth: 330, marginBottom: 5, marginTop: 2 }}>
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
                  Status da Solicitação: ${item.statusSolicitacao}
                  Motivo: ${item.motivo}
                  Destino: ${item.destino}
                  Viatura: ${item.viatura}
                  Placa: ${item.placa}
                  `}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </ul>
      </List>
    </>
  );
};

export default ReservasForm;

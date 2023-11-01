import { Card, CardContent, CardMedia, List, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

interface Reserva {
  id: number;
  viatura: string;
  statusSolicitacao: string;
  motivo: string;
  placa: string;
}
interface Solicitacao {
  id: number;
  viatura: string;
  statusSolicitacao: string;
  motivo: string;
  destino: string;
  placa: string;
}

const ReservasForm = () => {
  const url = "http://localhost:8080";
  const userContext = useContext(AuthContext);
  const [dataReserva, setDataReserva] = useState<Reserva[]>([]);
  const [dataSolicitacao, setDataSolicitacao] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true); // Adicionado um estado para controle de carregamento

  useEffect(() => {
    async function fetchData() {
      try {
        const solicitacaoResponse = await fetch(
          url + `/listaSolicitacao/${userContext.user.saram}`
        );
        if (!solicitacaoResponse.ok) {
          throw new Error("Erro ao buscar solicitacao");
        }
        const solicitacaoData = await solicitacaoResponse.json();

        const reservaResponse = await fetch(
          url + `/listaReserva/${userContext.user.saram}`
        );
        if (!reservaResponse.ok) {
          throw new Error("Erro ao buscar reserva");
        }
        const reservaData = await reservaResponse.json();

        setDataSolicitacao(solicitacaoData);
        setDataReserva(reservaData);
        setLoading(false); // Dados carregados com sucesso, definindo o estado de carregamento como false
      } catch (error) {
        console.error(error);
        setLoading(false); // Ocorreu um erro, definindo o estado de carregamento como false
      }
    }

    fetchData();
  }, [userContext.user.saram]);

  if (loading) {
    return <div>Carregando...</div>;
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
              key={item.id}
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
        <h1>Reservas</h1>
        <ul>
          {dataReserva.map((item) => (
            <Card
              sx={{ maxWidth: 330, marginBottom: 5, marginTop: 2 }}
              key={item.id}
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
                                        Status da Solicitação: ${item.statusSolicitacao}
                                        Motivo: ${item.motivo}
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

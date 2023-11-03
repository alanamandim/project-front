import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

const AllCarsSolicitacoes = () => {
  // FIXME: Check if this method is correctly
  const url = "http://localhost:8080";

  const [dataGet, setDataGet] = useState([]);
  // const [aprovador, setAprovador] = useState("");
  // const [status, setStatus] = useState("");
  // const [id, setId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getInfo() {
    const response = await fetch(url + `/listaSolicitacaoAguardandoAprovacao`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setDataGet(data);
    }
  }

  async function putInfo(aprovador: string, status: string, id: number) {
    const data = { aprovador, status, id };
    console.log(data);
    const response = await fetch(url + `/modificaStatusSolicitacao`, {
      method: "PUT",
      body: JSON.stringify(data),
      // FIXME: GET THE VALUE TO SEND TO BACKEND AND PUT INSIDE A STRINGIFY
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast.success(`Requisição enviada!`, {
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
                    {item.viatura}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`
                    Destino: ${item.destino}, 
                    Motivo: ${item.motivo}, 
                    Data/Hora: ${item.datahr},
                    Motorista: ${item.motorista}, 
                    Placa: ${item.placa}, 
                    Status: ${item.status}
                    `}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      putInfo(user.saram, "Aprovada", item.idSolicitacao);
                    }}
                  >
                    Aprovar
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      putInfo(user.saram, "Recusada", item.idSolicitacao);
                    }}
                  >
                    Recusar
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

export default AllCarsSolicitacoes;

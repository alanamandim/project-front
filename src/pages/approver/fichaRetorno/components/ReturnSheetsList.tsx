import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";

const ReturnSheetsList = () => {
  const lista = [
    {
      id: 1,
      nome: "Doblo",
      status: "Disponível",
    },
    {
      id: 2,
      nome: "Doblo2",
      status: "Disponível",
    },
  ];

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
        {lista.map((carro: any) => (
          <li key={`section-${carro.id}`}>
            <ul>
              <Card sx={{ maxWidth: 330, marginBottom: 5, marginTop: 2 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://s2-autoesporte.glbimg.com/OkOTAbm8c0hcBorNJK_n5VVN-3g=/0x0:1200x875/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/6/a/sh5QGuQUWsns9zfrqYGQ/fiat-doblo-50.jpg"
                  title="carro"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {carro.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {carro.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Aprovar</Button>
                  {/* <Button size="small">Solicitar</Button> */}
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

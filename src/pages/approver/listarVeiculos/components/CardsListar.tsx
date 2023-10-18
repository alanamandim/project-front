<<<<<<< HEAD
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

const AllCars = () => {
  // FIXME: Delete this if request works
  const data = [{
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  },]

  // FIXME: Do a request (axios or fetch) here and call him data

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 440,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {data.map((item) => (
        <li key={item.placa}>
          <ul>
            <ListSubheader><p>Veículo</p></ListSubheader>
            <ListItemText primary={`Placa: ${item.placa} - Modelo: ${item.modelo} - Status: ${item.status}`} />
          </ul>
        </li>
      ))}
    </List>
  );
}
=======
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const AllCars = () => {
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
>>>>>>> af94a40ff1ce4e5bd7b4709448bd72b2c079f6a8

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
                {/* <CardActions>
                <Button size="small">Reservar</Button>
                <Button size="small">Solicitar</Button>
              </CardActions> */}
              </Card>
            </ul>
          </li>
        ))}
      </List>
    </>
  );
};

export default AllCars;

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, Select } from "@mui/material";

function ListUsersCard() {
  const list = [
    {
      name: "Testando",
      saram: "123123123123",
      email: "testando#gmail.com",
      motorista: true,
      gestor: true,
      aprovador: true,
      emissor: true,
      foto: "https://sb.kaleidousercontent.com/67418/960x550/d1e78c2a25/individuals-a.png",
    },
    {
      name: "Testando",
      saram: "123123123123",
      email: "testando#gmail.com",
      motorista: true,
      gestor: true,
      aprovador: true,
      emissor: true,
      foto: "https://sb.kaleidousercontent.com/67418/960x550/d1e78c2a25/individuals-a.png",
    },
    {
      name: "Testando",
      saram: "123123123123",
      email: "testando#gmail.com",
      motorista: true,
      gestor: true,
      aprovador: true,
      emissor: true,
      foto: "https://sb.kaleidousercontent.com/67418/960x550/d1e78c2a25/individuals-a.png",
    },
    {
      name: "Testando",
      saram: "123123123123",
      email: "testando#gmail.com",
      motorista: true,
      gestor: true,
      aprovador: true,
      emissor: true,
      foto: "https://sb.kaleidousercontent.com/67418/960x550/d1e78c2a25/individuals-a.png",
    },
    {
      name: "Testando",
      saram: "123123123123",
      email: "testando#gmail.com",
      motorista: true,
      gestor: true,
      aprovador: true,
      emissor: true,
      foto: "https://sb.kaleidousercontent.com/67418/960x550/d1e78c2a25/individuals-a.png",
    },
    {
      name: "Testando",
      saram: "123123123123",
      email: "testando#gmail.com",
      motorista: true,
      gestor: true,
      aprovador: true,
      emissor: true,
      foto: "https://sb.kaleidousercontent.com/67418/960x550/d1e78c2a25/individuals-a.png",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row", overflowX: "scroll" }}>
      {list.map((users) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Enviar Ajustes</Button>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value={"motorista"}>Motorista</MenuItem>
              <MenuItem value={"aprovador"}>Aprovador</MenuItem>
              <MenuItem value={"gestor"}>Gestor</MenuItem>
              <MenuItem value={"emissor"}>Emissor</MenuItem>
            </Select>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default ListUsersCard;

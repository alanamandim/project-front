import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, Select } from "@mui/material";

function ListUsersCard() {
  const url = "http://localhost:8080";
  const [dataGet, setDataGet] = useState([{}]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getInfo() {
    const response = await fetch(url + `/listaReservaGestor`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(url, data);
      setDataGet(data);
    }
  }

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  // FIXME: Call this function when the button is pressed to refresh the content
  // FIXME: 'putInfo' is declared but its value is never read.
  async function putInfo(info1: string, info2: string) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ info1, info2 }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setDataGet(data);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", overflowX: "scroll" }}>
      {dataGet.map((user: any) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user.motorista}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Enviar Ajuste</Button>
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

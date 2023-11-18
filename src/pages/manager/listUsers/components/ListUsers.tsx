import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

function ListUsersCard() {
  const url = "http://localhost:8080";
  const { user } = useContext(AuthContext);
  const [dataGet, setDataGet] = useState([{}]);
  const [motorista, setMotoristaSelecionado] = useState(false);
  const [aprovador, setAprovadorSelecionado] = useState(false);
  const [gestor, setGestorSelecionado] = useState(false);
  const [chefe, setChefeSelecionado] = useState(false);
  const [identificador, setIdentificadorSelecionado] = useState(false);

  const handleCheckboxMotorista = (event: any) => {
    setMotoristaSelecionado(event.target.checked);
  };
  const handleCheckboxAprovador = (event: any) => {
    setAprovadorSelecionado(event.target.checked);
  };
  const handleCheckboxGestor = (event: any) => {
    setGestorSelecionado(event.target.checked);
  };
  const handleCheckboxChefe = (event: any) => {
    setChefeSelecionado(event.target.checked);
  };
  const handleCheckboxIdentificador = (event: any) => {
    setIdentificadorSelecionado(event.target.checked);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getInfo() {
    const response = await fetch("http://localhost:8080/usuariosPendentes", {
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
  }, []);

  // FIXME: Call this function when the button is pressed to refresh the content
  // FIXME: 'putInfo' is declared but its value is never read.
  async function putInfo(id: string) {
    const saram = id;
    const formData = {
      saram,
      motorista,
      identificador,
      gestor,
      chefe,
      aprovador,
    };
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(formData),
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
        <form onSubmit={(e) => e.preventDefault()}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.nome} e {user.email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Enviar Ajuste</Button>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={motorista}
                    onChange={handleCheckboxMotorista}
                  />
                }
                label="Motorista"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={aprovador}
                    onChange={handleCheckboxAprovador}
                  />
                }
                label="Aprovador"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={gestor} onChange={handleCheckboxGestor} />
                }
                label="Gestor"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={chefe} onChange={handleCheckboxChefe} />
                }
                label="Chefe"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={identificador}
                    onChange={handleCheckboxIdentificador}
                  />
                }
                label="Identificador"
              />
            </CardActions>
          </Card>
          <Button type="submit" onClick={() => putInfo(user.saram)}>
            Salvar
          </Button>
        </form>
      ))}
    </div>
  );
}

export default ListUsersCard;

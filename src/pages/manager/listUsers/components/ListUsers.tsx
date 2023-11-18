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
import * as React from "react";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ListUsersCard() {
  const url = "http://localhost:8080";
  const { user } = useContext(AuthContext);
  const [dataGet, setDataGet] = useState([{}]);
  const [motorista, setMotoristaSelecionado] = useState(false);
  const [aprovador, setAprovadorSelecionado] = useState(false);
  const [gestor, setGestorSelecionado] = useState(false);
  const [chefe, setChefeSelecionado] = useState(false);
  const [identificador, setIdentificadorSelecionado] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

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
    <ul>
      {dataGet.map((item: any) => (
        <form onSubmit={(e) => e.preventDefault()}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  U
                </Avatar>
              }
              title={item.nome}
              subheader={item.saram}
            />
            <CardMedia
              component="img"
              height="194"
              image="https://s2.glbimg.com/jsaPuF7nO23vRxQkuJ_V3WgouKA=/e.glbimg.com/og/ed/f/original/2014/06/10/461777879.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {`Email: ${item.email}`}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button type="submit" onClick={() => putInfo(user.saram)}>
                Salvar
              </Button>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <CardActions sx={{ overflow: "hidden" }}>
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
                      <Checkbox
                        checked={gestor}
                        onChange={handleCheckboxGestor}
                      />
                    }
                    label="Gestor"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={chefe}
                        onChange={handleCheckboxChefe}
                      />
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
              </CardContent>
            </Collapse>
          </Card>
          {/* <Card sx={{ maxWidth: 330, marginBottom: 5, marginTop: 2 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="carro"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <CardActions sx={{ overflow: "hidden" }}>
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
                      <Checkbox
                        checked={gestor}
                        onChange={handleCheckboxGestor}
                      />
                    }
                    label="Gestor"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={chefe}
                        onChange={handleCheckboxChefe}
                      />
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
              </Typography>
            </CardContent>
          </Card>
          <Button type="submit" onClick={() => putInfo(user.saram)}>
            Salvar
          </Button> */}
        </form>
      ))}
    </ul>
  );
}

export default ListUsersCard;

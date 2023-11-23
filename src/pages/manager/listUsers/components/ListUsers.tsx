import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Checkbox, FormControlLabel, Modal } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import * as React from "react";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ListUsersCard() {
  const url = "http://localhost:8080";
  const { user } = useContext(AuthContext);
  const [dataGet, setDataGet] = useState([{}]);
  const [expanded, setExpanded] = useState(false);
  const [userSelected, setUserSelected] = useState<any>({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item: any) => {
    setUserSelected(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [checkboxValues, setCheckboxValues] = useState({
    motorista: true,
    aprovador: true,
    gestor: true,
    chefe: true,
    identificador: true,
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setCheckboxValues({
      ...checkboxValues,
      [name]: checked,
    });
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
      checkboxValues,
    };
    console.log(formData);
    const response = await fetch(url + "/gestorDePerfil", {
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
        <Card sx={{ maxWidth: 345, marginBottom: 10 }}>
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
              <CardActions
                sx={{ overflow: "hidden" }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Button onClick={() => handleOpen(item)}>
                  Abrir Formulário
                </Button>
              </CardActions>
            </CardContent>
          </Collapse>
        </Card>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {userSelected.nome}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Typography paragraph>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="motorista"
                      checked={checkboxValues.motorista}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Motorista"
                />
              </Typography>
              <Typography paragraph>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="aprovador"
                      checked={checkboxValues.aprovador}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Aprovador"
                />
              </Typography>
              <Typography paragraph>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="gestor"
                      checked={checkboxValues.gestor}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Gestor"
                />
              </Typography>
              <Typography paragraph>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="chefe"
                      checked={checkboxValues.chefe}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Chefe"
                />
              </Typography>
              <Typography paragraph>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="identificador"
                      checked={checkboxValues.identificador}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Identificador"
                />
              </Typography>
            </Typography>
            <Button type="submit" onClick={() => putInfo(user.saram)}>
              Salvar
            </Button>
          </form>
        </Box>
      </Modal>
    </ul>
  );
}

export default ListUsersCard;

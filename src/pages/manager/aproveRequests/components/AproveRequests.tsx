import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { Button } from "@mui/material";

const url = "http://localhost:8080";

const ListRequests: any = async () => {
  const [checked, setChecked] = useState([1]);
  const [id, setId] = useState(null);
  const [status, setStatus] = useState("");
  const [dataGet, setDataGet] = React.useState([{}]);

  // FIXME: 'handleToggle' is declared but its value is never read.
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getInfo() {
    const response = await fetch(url + "/listaReservaGestor", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setDataGet(data);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  // FIXME: Call this function when the button is pressed to refresh the content
  // FIXME: 'putInfo' is declared but its value is never read.
  async function putInfo() {
    const sendData = { status, id };
    const response = await fetch(url + "/modificaStatusReserva", {
      method: "PUT",
      body: JSON.stringify(sendData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(url, data);
      setDataGet(data);
    }
  }

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {dataGet.map((value: any) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            secondaryAction={
              <Button
                onClick={() => {
                  setId(value.idReserva);
                  setStatus("Aprovada");
                  putInfo();
                }}
                variant="contained"
                size="large"
              >
                APROVAR
              </Button>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Pedido n° ${value + 1}`}
                  src={`https://img.freepik.com/vetores-premium/icone-de-avatar-masculino-pessoa-desconhecida-ou-anonima-icone-de-perfil-de-avatar-padrao-usuario-de-midia-social-homem-de-negocios-silhueta-de-perfil-de-homem-isolada-no-fundo-branco-ilustracao-vetorial_735449-120.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Nome: ${value.motorista}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListRequests;

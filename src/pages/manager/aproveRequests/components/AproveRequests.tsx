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
  const [id, setId] = useState(null);
  const [status, setStatus] = useState("");
  const [dataGet, setDataGet] = useState([{}]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    getInfo();
  }, []); // Disparar apenas na montagem inicial

  async function getInfo() {
    const response = await fetch(url + `/listaReservaGestor`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setDataGet(data);
      console.log(data);
    }
  }

  async function putInfo() {
    try {
      const sendData = { status, id };
      const response = await fetch(url + "/modificaStatusReserva", {
        method: "PUT",
        body: JSON.stringify(sendData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setDataGet(data);
      }
    } catch (error) {
      // Tratar erros, se necessário
      console.error("Erro ao atualizar dados:", error);
    }
  }

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {dataGet.map((value: any) => {
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
                  alt={`Pedido n° ${value.idReserva}`}
                  src={`https://img.freepik.com/vetores-premium/icone-de-avatar-masculino-pessoa-desconhecida-ou-anonima-icone-de-perfil-de-avatar-padrao-usuario-de-midia-social-homem-de-negocios-silhueta-de-perfil-de-homem-isolada-no-fundo-branco-ilustracao-vetorial_735449-120.jpg`}
                />
              </ListItemAvatar>
              <ListItemText primary={`Nome: ${value.motorista}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListRequests;

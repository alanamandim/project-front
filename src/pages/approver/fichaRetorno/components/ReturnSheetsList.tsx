import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import { useEffect, useState } from "react";

const ReturnSheetsList = () => {
  // FIXME: Check if this method is correctly
  const url = "http://localhost:8080";

  const [dataGet, setDataGet] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getInfo() {
    const response = await fetch(url, {
      method: "GET",
      body: JSON.stringify(dataGet),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setDataGet(data)
    }
  }

  useEffect(() => {
    getInfo()
  }, [getInfo])

  async function putInfo(info1: string, info2: string) {
    // FIXME: Check if this method is correctly
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ info1, info2 }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setDataGet(data)
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
                    {item.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Aprovar</Button>
                  <Button size="small" onClick={() => putInfo(item.nome, item.status)}>Solicitar</Button>
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

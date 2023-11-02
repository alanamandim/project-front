import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import List from "@mui/material/List";
import { useEffect, useState } from "react";

const AllCars = () => {
  // FIXME: Check if this method is correctly
  const url = "http://localhost:8080";

  const [dataGet, setDataGet] = useState([]);

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getInfo() {
    const response = await fetch(url + `/listaSituacaoViaturas`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setDataGet(data);
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
        {dataGet.map((item: any) => (
          <li key={`section-${item.placa}`}>
            <ul>
              <Card sx={{ maxWidth: 330, marginBottom: 5, marginTop: 2 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://s2-autoesporte.glbimg.com/OkOTAbm8c0hcBorNJK_n5VVN-3g=/0x0:1200x875/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/6/a/sh5QGuQUWsns9zfrqYGQ/fiat-doblo-50.jpg"
                  title="carro"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.modelo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Status: ${item.status}, 
                    Placa: ${item.placa}`}
                  </Typography>
                </CardContent>
              </Card>
            </ul>
          </li>
        ))}
      </List>
    </>
  );
};

export default AllCars;

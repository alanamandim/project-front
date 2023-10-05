import { Button, Grid, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  const user = "user";
  return (
    <Grid
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="80vh"
    >
      <Typography variant="h3" mt={3} alignItems="center">
        Dashboard
      </Typography>
      {/* <Typography variant="caption" mt={2} alignItems="center">
        {user}
      </Typography> */}
      <Grid display="flex" mt={3} flexDirection="column">
        <Grid item mb={3}>
          <Button variant="contained" size="large" type="button">
            Motorista
          </Button>
        </Grid>
        <Grid item mb={3}>
          <Button variant="contained" size="large" type="button">
            Gestor
          </Button>
        </Grid>
        <Grid item mb={3}>
          <Button variant="contained" size="large" type="button">
            Aprovador
          </Button>
        </Grid>
        <Grid item mb={3}>
          <Button variant="contained" size="large" type="button">
            Emissor
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

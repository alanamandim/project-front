import { Grid, Typography } from "@mui/material";
import React from "react";
import MissionForm from "./components/missionForm";

const Mission = () => {
  return (
    <Grid
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="80vh"
    >
      <Typography variant="h3" mt={3} alignItems="center">
        Formulário Missão
      </Typography>
      <MissionForm />
    </Grid>
  );
};

export default Mission;

import React from "react";
import InspForm from "./components/inspForm";
import { Grid, Typography } from "@mui/material";

const Inspetion = () => {
  return (
    <Grid
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="80vh"
    >
      <Typography variant="h3" mt={3} mb={6} alignItems="center">
        Formulário de Inspeção
      </Typography>
      <InspForm />
    </Grid>
  );
};

export default Inspetion;

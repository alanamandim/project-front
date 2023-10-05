import React from "react";
import RegisterForm from "./components/RegisterForm";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const Register = () => {
  return (
    <Grid
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Typography variant="h3" mt={3} mb={3} alignItems="center">
        Register Page
      </Typography>
      <RegisterForm />
    </Grid>
  );
};

export default Register;

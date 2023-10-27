import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Manager = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {user.gestor == true ? (
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h3" mt={3} mb={3} alignItems="center">
            Gestor Page
          </Typography>
          <Grid display="flex" mt={3} flexDirection="column">
            <Grid item mb={3}>
              <Button
                style={{ width: "200px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/manager/list-users");
                }}
              >
                Tags de usuário
              </Button>
            </Grid>
            <Grid item mb={3}>
              <Button
                style={{ width: "200px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/manager/aprove-requests");
                }}
              >
                Solicitações de Reserva
              </Button>
            </Grid>
            <Grid item mb={3}>
              <Button
                style={{ width: "200px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/manager/create-cars");
                }}
              >
                Cadastrar Carro
              </Button>
            </Grid>
            <Grid item mb={3}>
              <Button
                style={{ width: "200px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/manager/create-cars-models");
                }}
              >
                Cadastrar Modelo
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Manager;

import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
import AllCards from "./components/CardsListar";

const ListarVeiculos = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
<<<<<<< HEAD
      {
        user.aprovador == true ? (
          <Grid
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
          >
            <Typography variant="h3" mt={3} mb={3} alignItems="center">
              List all Cars
            </Typography>
            <Typography variant="h4" mt={3} alignItems="center">
              Todos os veículos disponíveis
            </Typography>
            <AllCards />
          </Grid>
        ) : (
          <Navigate to="/" />
        )
      }
=======
      {user.aprovador == true ? (
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h3" mt={3} mb={3} alignItems="center">
            List all Cars
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Todos os veículos disponíveis
          </Typography>
          <AllCards />
        </Grid>
      ) : (
        <Navigate to="/" />
      )}
>>>>>>> af94a40ff1ce4e5bd7b4709448bd72b2c079f6a8
    </>
  );
};

export default ListarVeiculos;

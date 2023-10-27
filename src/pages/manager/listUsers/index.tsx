import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import ListUsersCard from "./components/ListUsers";

const ListUsersPage = () => {
  const { user } = useContext(AuthContext);
  const userLocal: any = localStorage.getItem("user");

  return (
    <>
      {user.gestor == true || userLocal.gestor == true ? (
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h3" mt={3} mb={3} alignItems="center">
            List all Users
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Todos os veículos disponíveis
          </Typography>
          <ListUsersCard />
        </Grid>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ListUsersPage;

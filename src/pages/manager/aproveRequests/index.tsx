import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import ListRequests from "./components/AproveRequests";
import { toast } from "react-toastify";

const RequestUsers = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.gestor === true ? (
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h3" mt={3} mb={3} alignItems="center">
            Request Page
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Listagem dos pedidos de Reserva
          </Typography>
          <ListRequests />
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default RequestUsers;

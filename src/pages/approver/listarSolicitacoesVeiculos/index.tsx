import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import AllCarsSolicitacoes from "./components/CardsListarSolicitacoes";
import { toast } from "react-toastify";

const CardsList = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.aprovador == true ? (
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h3" mt={3} mb={3} alignItems="center">
            Solicitation Page
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Veja os veículos que foram solicitados
          </Typography>
          <AllCarsSolicitacoes />
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default CardsList;

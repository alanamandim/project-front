import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import AllCards from "./components/CardsListar";
import { toast } from "react-toastify";

const ListarVeiculos = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.aprovador === true ? (
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
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default ListarVeiculos;

import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import MissaoFicha from "./components/FichaMissao";

const Missao = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.motorista === true ? (
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h3" mt={3} mb={3} alignItems="center">
            Missao Page
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Essa é a ficha da sua missão:
          </Typography>
          <MissaoFicha />
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default Missao;

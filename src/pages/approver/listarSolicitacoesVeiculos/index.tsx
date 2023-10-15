import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import AllCarsSolicitacoes from "./components/CardsListarSolicitacoes";


const CardsList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
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
                Solicitation Page
              </Typography>
              <Typography variant="h4" mt={3} alignItems="center">
                Preencha o formulário para solicitar um veículo:
              </Typography>
              <AllCarsSolicitacoes/>
            </Grid>  
        ) : (
          <Navigate to="/" />
        )
      }
    </>
  )
};

export default CardsList;

import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import MediaCard from "./components/ListUsers";




const ListUsersPage = () => {
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
                List all Cars
              </Typography>
              <Typography variant="h4" mt={3} alignItems="center">
                Todos os veículos disponíveis
              </Typography>
              <MediaCard />
            </Grid>  
        ) : (
          <Navigate to="/" />
        )
      }
    </>
  )
};

export default ListUsersPage;

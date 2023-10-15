import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import ReturnSheetsList from "./components/ReturnSheetsList";


const ReturnSheets = () => {
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
                Return Sheets Page
              </Typography>
              <Typography variant="h4" mt={3} alignItems="center">
                Fichas de Retorno:
              </Typography>
              <ReturnSheetsList/>
            </Grid>  
        ) : (
          <Navigate to="/" />
        )
      }
    </>
  )
};

export default ReturnSheets;

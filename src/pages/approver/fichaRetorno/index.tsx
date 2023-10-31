import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import ReturnSheetsList from "./components/ReturnSheetsList";
import { toast } from "react-toastify";

const ReturnSheets = () => {
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
            Return Sheets Page
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Fichas de Retorno:
          </Typography>
          <ReturnSheetsList />
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default ReturnSheets;

import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const Approver = () => {
  const { user } = useContext(AuthContext);

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
                Approver Page
              </Typography>
              {/* <RegisterForm /> */}
            </Grid>  
        ) : (
          <Navigate to="/" />
        )
      }
    </>
  )
};

export default Approver;

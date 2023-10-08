import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Manager = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {
        user.gestor == true ? (
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
            >
              <Typography variant="h3" mt={3} mb={3} alignItems="center">
                manager Page
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

export default Manager;

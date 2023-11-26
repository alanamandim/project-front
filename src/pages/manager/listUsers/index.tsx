import { AuthContext } from "../../../context/AuthContext";
import { Grid, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import ListUsersCard from "./components/ListUsers";
import { toast } from "react-toastify";

const ListUsersPage = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      const userLS: any = localStorage.getItem("user");
      const userOBJ = JSON.parse(userLS);
      setUser(userOBJ);
    }
  }, []);

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
            List all Users
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Todos os pedidos dos usuários
          </Typography>
          <ListUsersCard />
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default ListUsersPage;

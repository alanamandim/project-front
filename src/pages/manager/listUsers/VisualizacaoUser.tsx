import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import * as React from "react";

const VisualizacaoUser = () => {
  const url = "http://localhost:8080";
  const userLocal: any = localStorage.getItem("user");
  const [saram, setSaram] = React.useState("");
  const [user, setUser] = React.useState<any>({});
  const [checkboxValues, setCheckboxValues] = React.useState({
    motorista: true,
    aprovador: true,
    gestor: true,
    chefe: true,
    identificador: true,
  });

  if (userLocal) {
    const userOBJ = JSON.parse(userLocal);
    console.log(userOBJ);
    setSaram(userOBJ.saram);
    setUser(userOBJ);
  }

  const handleCheckboxChange = (event: any) => {
    // const { name, checked } = event.target;
    // setCheckboxValues({
    //   ...checkboxValues,
    //   [name]: checked,
    // });
  };

  async function putInfo() {
    const formData = {
      saram,
      motorista: checkboxValues.motorista,
      aprovador: checkboxValues.aprovador,
      gestor: checkboxValues.gestor,
      chefe: checkboxValues.chefe,
      idetificador: checkboxValues.identificador,
    };
    console.log(formData);
    const response = await fetch(url + "/gestorDePerfil", {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  }

  const estiloDoContainer: any = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    /* Outros estilos se necessário */
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        style={estiloDoContainer}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {user.nome /*"Artrid Artilheiro de Milão Souza Cabrito"} */}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Typography paragraph>
            <FormControlLabel
              control={
                <Checkbox
                  name="motorista"
                  checked={checkboxValues.motorista}
                  onChange={handleCheckboxChange}
                />
              }
              label="Motorista"
            />
          </Typography>
          <Typography paragraph>
            <FormControlLabel
              control={
                <Checkbox
                  name="aprovador"
                  checked={checkboxValues.aprovador}
                  onChange={handleCheckboxChange}
                />
              }
              label="Aprovador"
            />
          </Typography>
          <Typography paragraph>
            <FormControlLabel
              control={
                <Checkbox
                  name="gestor"
                  checked={checkboxValues.gestor}
                  onChange={handleCheckboxChange}
                />
              }
              label="Gestor"
            />
          </Typography>
          <Typography paragraph>
            <FormControlLabel
              control={
                <Checkbox
                  name="chefe"
                  checked={checkboxValues.chefe}
                  onChange={handleCheckboxChange}
                />
              }
              label="Chefe"
            />
          </Typography>
          <Typography paragraph>
            <FormControlLabel
              control={
                <Checkbox
                  name="identificador"
                  checked={checkboxValues.identificador}
                  onChange={handleCheckboxChange}
                />
              }
              label="Identificador"
            />
          </Typography>
        </Typography>
        <Button type="button" onClick={() => putInfo()}>
          Salvar
        </Button>
      </form>
    </>
  );
};

export default VisualizacaoUser;

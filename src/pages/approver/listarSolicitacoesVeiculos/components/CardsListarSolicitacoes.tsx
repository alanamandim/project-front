import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

const AllCarsSolicitacoes = () => {
  // FIXME: Delete this if request works
  const data = [{
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  }, {
    "placa": "QJBHDS",
    "modelo": "Doblo",
    "status": "Disponível"
  },]

  // FIXME: Do a request (axios or fetch) here and call him data

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 440,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {data.map((item) => (
        <li key={item.placa}>
          <ul>
            <ListSubheader><p>Veículo</p></ListSubheader>
            <ListItemText primary={`Placa: ${item.placa} - Modelo: ${item.modelo} - Status: ${item.status}`} />
          </ul>
        </li>
      ))}
    </List>
  );
}

export default AllCarsSolicitacoes;
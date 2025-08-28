
import express from "express";
const app = express();
const PORT = 8080
import {ListaFilmes, LerFilme, CriarFilme} from './Controles/ControlFilmes.js'


app.use(express.json());


app.get('/filmes/ler/:id', (req, res) => {
  const { id } = req.params;
  LerFilme(id, res);
});

app.post('/filmes/addFilme', (req, res) => {
  CriarFilme(req, res);
})


// Route handler
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Server running on port 8080');
});
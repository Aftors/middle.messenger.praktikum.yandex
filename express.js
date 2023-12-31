import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = 3000

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname ,'dist')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

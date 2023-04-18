import express from 'express';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
app.use(cors('*'));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(PORT, () =>
  console.log(
    `Server started on PORT [${PORT}] at ${new Date().toLocaleString()}`,
  ),
);

import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import userRouter from './router/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.static(join(__dirname, 'public')));

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
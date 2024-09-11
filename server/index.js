import express from 'express';
import { env } from './env.js'
import { apiRouter } from './router/api.js';

const app = express();

app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)

app.all('*', (req, res) => {
    return res.json({ status: 'error', message: "Wrong page" });
})

app.listen(env.SERVER_PORT, () => {
    console.log(`Turizmo serveris: http://localhost:${env.SERVER_PORT}`);
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

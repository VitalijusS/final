import express from 'express';
import { env } from './env.js'
import { apiRouter } from './router/api.js';
import cors from 'cors';
import helmet from 'helmet';
import { cookieParser } from './middleware/cookie.js';
import { userDetails } from './middleware/user.js';

const app = express();
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:' + env.CLIENT_PORT,
}
const helmetOptions = {
    crossOriginResourcePolicy: false,
}

app.use(express.json({
    type: 'application/json',
}));
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(helmet(helmetOptions))

app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser);
app.use(userDetails);

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

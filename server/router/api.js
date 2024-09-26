import express from 'express';
import { locationsApiRouter } from './locations/locations.js';
import { registerApiRouter } from './register/register.js';
import { loginApiRouter } from './login/login.js';
import { logoutApiRouter } from './logout/logout.js';
import { likesListRouter } from './likes-list/likesList.js';
import { likeRouter } from './like/likeRouter.js';

export const apiRouter = express.Router();

apiRouter.use('/locations', locationsApiRouter);
apiRouter.use('/register', registerApiRouter);
apiRouter.use('/login', loginApiRouter);
apiRouter.use('/logout', logoutApiRouter);
apiRouter.use('/likes-list', likesListRouter);
apiRouter.use('/like', likeRouter);

apiRouter.all('/', (req, res) => {
    return res.json({ status: 'error', message: 'Pick endpoint' })
})

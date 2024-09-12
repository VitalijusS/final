import express from 'express';
import connection from '../../db.js';

export const locationsApiRouter = express.Router();

locationsApiRouter.get('/', async (req, res) => {

    const sql = 'SELECT * FROM locations;';
    const dataFromServer = await connection.execute(sql);

    return res.json({
        status: 'Success',
        data: dataFromServer[0],
    });
})
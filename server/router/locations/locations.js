import express from 'express';
import connection from '../../db.js';

export const locationsApiRouter = express.Router();

locationsApiRouter.get('/', async (req, res) => {
    const sql = 'SELECT * FROM locations;';
    let dataFromServer = null;
    try {
        dataFromServer = await connection.execute(sql);
    } catch (error) {
        dataFromServer = [[]];
    }

    return res.json({
        status: 'Success',
        data: dataFromServer[0],
    });
})
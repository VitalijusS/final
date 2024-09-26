import express from 'express';
import connection from '../../db.js';

export const likesListRouter = express.Router();

likesListRouter.get('/', async (req, res) => {
    if (req.user.role !== 'user') {
        return res.json({
            status: 'error',
            msg: 'Only available for registered users '
        })
    }
    let list = []
    try {
        const sql = 'SELECT location_id FROM favorites WHERE user_id = ?;';
        const [selectResult] = await connection.execute(sql, [req.user.id]);
        list = selectResult.map(item => item.location_id)
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Could not get list of favorites, try later'
        })

    }

    return res.json({
        status: 'success',
        data: list
    })
})
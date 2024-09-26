import exprees from 'express';
import connection from '../../db.js';

export const likeRouter = exprees.Router();

likeRouter.post('/', async (req, res) => {
    if (req.user.role !== 'user') {
        return res.json({
            status: 'error',
            msg: 'Need to be logged in as user'
        })
    }
    const { locationId } = req.body;

    if (typeof locationId !== 'number' || locationId < 1 || !Number.isInteger(locationId)) {
        return res.json({
            status: 'error',
            msg: 'Location ID has to be positive integer'
        })
    }
    try {
        const sql = 'SELECT * FROM favorites WHERE user_id = ? AND location_id = ?;';
        const [result] = await connection.execute(sql, [req.user.id, locationId]);
        if (result.length !== 0) {
            return res.json({
                status: 'error',
                msg: 'Is already favorite'
            })
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const sql = 'INSERT INTO favorites (user_id, location_id) VALUES (?,?);';
        const [result] = await connection.execute(sql, [req.user.id, locationId]);
        if (result.affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Error addring favorite'
            })
        }
    } catch (error) {
        console.log(error);
    }

    return res.json({
        status: 'success',

    })
})
likeRouter.delete('/', (req, res) => {
    return res.json({
        status: 'success',
        msg: 'deleted'
    })
})
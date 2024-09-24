import express from 'express';
import connection from '../../db.js';

export const logoutApiRouter = express.Router();

logoutApiRouter.get('/', getLogout);



logoutApiRouter.use('/', (req, res) => {
    return res.json({
        status: 'error',
        message: 'error'
    })
})


async function getLogout(req, res) {
    if (!req.cookies.loginToken) {
        return res.json({
            status: "error",
            message: 'No session',
        });
    }
    try {
        const sql = 'DELETE FROM tokens WHERE token = ?;';
        const result = await connection.execute(sql, [req.cookies.loginToken]);
        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'Error',
                data: 'No user with this password',
            });
        }
    } catch (error) {

        return res.json({
            status: 'Error',
            data: "Thechnical difficulties",
        });
    }

    const cookie = [
        'loginToken=' + req.cookies.loginToken,
        'path=/',
        'domain=localhost',
        'max-age=-1',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly'
    ];

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            data: "Logged out",
        })
}

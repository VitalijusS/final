import connection from '../db.js';
import { env } from '../env.js'

export async function userDetails(req, res, next) {
    req.user = {
        isLoggedIn: false,
        role: 'public',
        userName: ''
    };

    const { cookies } = req;

    if (typeof cookies.loginToken === 'string' && cookies.loginToken.length === 20) {
        try {
            const sql = `
            SELECT 
                users.username,
                tokens.created_at AS token_created_at,
                users.created_at AS user_created_at
            FROM tokens
            INNER JOIN users ON tokens.user_id = users.id
            WHERE token = ? AND tokens.created_at >= ?;`;
            const deadline = new Date(Date.now() - env.COOKIE_MAX_AGE * 1000);

            const [selectResult] = await connection.execute(sql, [cookies.loginToken, deadline]);

            if (selectResult.length === 1) {
                req.user.isLoggedIn = true;
                req.user.role = 'user';
                req.user.username = selectResult[0].username;
            }
        } catch (error) {
            console.log(error);
            return res.json({
                isLoggedIn: false,
            });
        }
    }
    next();
}

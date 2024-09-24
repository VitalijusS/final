import express from 'express';
import { isValidPassword, isValidUserName } from '../../lib/isValid.js';
import connection from '../../db.js';

export const loginApiRouter = express.Router();

loginApiRouter.post('/', async (req, res) => {
    const data = req.body;
    if (typeof data !== 'object' || Array.isArray(data) || data === null) {
        return res.json({
            status: 'Error',
            data: "Data needs to be object",
        });
    }
    const requiredFields = ['username', 'password']
    if (Object.keys(data).length !== requiredFields.length) {
        return res.json({
            status: 'Error',
            data: `Object needs to contain only ${requiredFields.length} keys ${requiredFields.join(', ')}`,
        });
    }
    const { username, password } = data;
    const usernameError = isValidUserName(username);

    if (usernameError) {
        return res.json({
            status: 'Error',
            data: usernameError,
        });
    }

    const passwordError = isValidPassword(password);

    if (passwordError) {
        return res.json({
            status: 'Error',
            data: passwordError,
        });
    }
    let userData = null;
    try {
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?;';
        const result = await connection.execute(sql, [username, password]);
        if (result[0].length !== 1) {
            return res.json({
                status: 'Error',
                data: 'No user with this password',
            });
        }
        userData = result[0][0];
    } catch (error) {
        return res.json({
            status: 'Error',
            data: "Thechnical difficulties",
        });
    }
    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let token = '';
    for (let i = 0; i < 20; i++) {
        token += abc[Math.floor(Math.random() * abc.length)]
    }
    try {
        const sql = `INSERT INTO tokens (token, user_id) VALUES (?,?);`;
        await connection.execute(sql, [token, userData.id]);
    } catch (error) {
        return res.json({
            status: 'Error',
            data: "Error creating a session",
        });
    }
    const cookie = [
        'loginToken=' + token,
        'path=/',
        'domain=localhost',
        'max-age=3600',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly'
    ]
    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'Success',
            data: 'Login was successful',
            isLoggedIn: true,
            role: userData.role,
        });
})
loginApiRouter.get('/', async (req, res) => {
    return res.json({
        isLoggedIn: req.user.isLoggedIn,
        role: req.user.role,
    })
})

loginApiRouter.all('/', (req, res) => {
    return res.json({
        status: 'Error',
        data: "This method is not supported",
    });
})
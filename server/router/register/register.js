import express from 'express';
import { isValidPassword, isValidUserName } from '../../lib/isValid.js';
import connection from '../../db.js';

export const registerApiRouter = express.Router();

registerApiRouter.post('/', async (req, res) => {
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

    try {
        const sql = `INSERT INTO users (username, password) VALUES (?,?);`;
        const result = await connection.execute(sql, [username, password]);
        if (result.affectedRows !== 1) {
            return res.json({
                status: 'Error',
                data: "User name taken",
            });
        }
    } catch (error) {
        return res.json({
            status: 'Error',
            data: error,
        });
    }

    return res.json({
        status: 'Success',
        data: req.body,
    });
})
registerApiRouter.all('/', (req, res) => {
    return res.json({
        status: 'Error',
        data: "This method is not supported",
    });
})
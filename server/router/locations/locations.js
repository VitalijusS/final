import express from 'express';
import mysql from '../../db.js';
import connection from '../../db.js';

export const locationsApiRouter = express.Router();

locationsApiRouter.get('/', async (req, res) => {
    const data = [{
        img: '/',
        name: 'Moon',
        address: {
            country: 'a',
            city: 'a',
            street: 'a',
            number: 'a',
            zip: 'a',
        },
    },
    {
        img: '/',
        name: 'Flower',
        address: {
            country: 'b',
            city: 'b',
            street: 'b',
            number: 'b',
            zip: 'b',
        },
    },
    {
        img: '/',
        name: 'Jelly fish',
        address: {
            country: 'c',
            city: 'c',
            street: 'c',
            number: 'c',
            zip: 'c',
        },
    },]

    const sql = 'SELECT * FROM locations;';
    const dataFromServer = await connection.execute(sql);

    console.log(dataFromServer);


    return res.json({
        status: 'Success',
        data: data,
    });
})
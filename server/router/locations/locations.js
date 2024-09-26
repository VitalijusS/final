import express from 'express';
import connection from '../../db.js';
import { isNonEmptyString } from '../../lib/isValid.js';

export const locationsApiRouter = express.Router();

locationsApiRouter.get('/', async (req, res) => {
    const sql = `SELECT locations.id AS id, name, img, country, city, street, number, zip 
    FROM locations 
    INNER JOIN address 
        on address.id = locations.address_id;`;
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

locationsApiRouter.post('/', async (req, res) => {

    const { name, img, country, city } = req.body;
    let { street, number, zip } = req.body;

    const validName = isNonEmptyString(name);
    const validImg = isNonEmptyString(img);
    const validCountry = isNonEmptyString(country);
    const validCity = isNonEmptyString(city);
    const validStreet = isNonEmptyString(street);
    const validNumber = isNonEmptyString(number);
    const validZip = isNonEmptyString(zip);

    if (!validName && !validImg && !validCountry && !validCity) {
        return res.json({
            status: 'error',
            message: "Missing required information",
        });
    }
    if (!validStreet) {
        street = '';
    }
    if (!validNumber) {
        number = '';
    }
    if (!validZip) {
        zip = 0;
    }

    let addressId = null;

    try {
        const sql = 'SELECT * FROM address WHERE country=? AND city=? AND street=? AND number =? AND zip=?;';
        const [responseData] = await connection.execute(sql, [country, city, street, number, zip]);
        if (responseData.length === 1) {
            addressId = responseData[0].id;
        }
    } catch (error) {
        console.log(error);

        return res.json({
            status: 'error',
            message: "Could not create location",
        });
    }

    if (!addressId) {
        try {
            const sql = 'INSERT INTO address (country, city, street, number, zip) VALUES (?,?,?,?,?);';
            const insertResult = await connection.execute(sql, [country, city, street, number, zip]);
            if (insertResult[0].affectedRows === 1) {
                addressId = insertResult[0].insertId;
            }
        } catch (error) {
            console.log(error);

            return res.json({
                status: 'error',
                message: "Could not create location",
            });
        }
    }

    try {
        const sql = 'INSERT INTO locations (name, img, address_id) VALUES (?, ?, ?);';
        const [insertResponse] = await connection.execute(sql, [name, img, addressId])
        if (insertResponse.affectedRows !== 1) {
            return res.json({
                status: 'error',
                message: "Could not create location",
            });
        }
    } catch (error) {
        console.log(error);

        return res.json({
            status: 'error',
            message: "Could not create location",
        });
    }

    return res.json({
        status: 'success',
        message: "New location added",
    });
})
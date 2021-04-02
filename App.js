const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const port = 8000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is up and running.');
})

app.listen(port, () => {
    console.log(`listening in at http://localhost:${port}`);
})

let data = null;
const username = 'norogoth';
const password = '44Gorkles^';

let c = mysql.createConnection({
    host: 'localhost',
    user: username,
    password: password,
    database: 'bingo'
})

function getData() {
    c.connect(function(e) {
        if (e) {
            console.log("Error: ", e);
            return;
        }
        console.log('Connected to DB successfully.');
        c.query('SELECT * FROM bingo.bingo_values', function (e, result) {
            if (e) {
                console.log("error with query: ",e);
            }
            data = result;
        })
    })
}

app.get('/bingo_values', (req, res) => {
    getData();
    return res.status(200).send({
        success: 'true',
        message: 'users',
        data: data
    })
})
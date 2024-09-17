import express from 'express';
import bodyParser from 'body-parser';
import Message from './Messsage.js';
import xml2js from 'xml2js';
import xmlParser from 'xml-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type : "application/xml"}));


const records = [];

app.post('/records', (req, res) => {
    const contentType = req.headers['content-type'];
    if (contentType === 'application/json') {
        const { name, surname, dateOfCreation } = req.body;
        const id = records.length;
        let newRecord = null;
        if (id && name && surname  && dateOfCreation) {
            newRecord = new Message(records.length, surname, name, dateOfCreation);
        } else if (id && name && surname) {
            newRecord = new Message(records.length, surname, name ,new Date());
        } else {
            res.status(400).send('Bad request');
            return;
        }
        records.push(newRecord);
        res.status(201).json(newRecord);
    } else if (contentType === 'application/xml') {
        const xmlData = xmlParser(req.body);
        xml2js.parseString(req.body, (err, result) => {
        if (err) {
            res.status(400).json({ error: 'Invalid XML data' });
        } else {
            const { surname, name, dateofCreation } = result.record;
            const newRecord = new Message(records.length + 1, surname[0], name[0], new Date());
            records.push(newRecord);
            console.log(newRecord);
            const recordObj = {
                id: newRecord.id,
                name: newRecord.name,
                surname: newRecord.surname,
                dateOfCreation: newRecord.dateOfCreation.toISOString() // Convert date to ISO string
            }; 

            const builder = new xml2js.Builder();
            const xml = builder.buildObject({ record: recordObj });
            res.set('Content-Type', 'application/xml');
            res.status(201).send(xml);
        }
        });
    } else {
        res.status(400).json({ error: 'Invalid content type' });
    }
});

app.get('/records/:id', (req, res) => {
    const recordId = parseInt(req.params.id);
    const record = records.find((record) => {
        return record.id === recordId;
    })
    if (record) {
        const acceptHeader = req.headers['accept'];
        if (acceptHeader === 'application/json') {
            res.status(200).json(record);
        } else if (acceptHeader === 'application/xml') {
            const recordObj = {
                id: record.id,
                name: record.name,
                surname: record.surname,
                dateOfCreation: record.dateOfCreation.toISOString() // Convert date to ISO string
            };

           const builder = new xml2js.Builder();
            const xml = builder.buildObject({ record: recordObj });
            res.set('Content-Type', 'application/xml');
            res.status(200).send(xml);
        } else {
            res.status(406).json({ error: 'Invalid accept header' });
        }
    } else {
        res.status(404).json({ error: 'Record not found' });
    }
    
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
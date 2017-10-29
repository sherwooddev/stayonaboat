require('dotenv').config();

const boats = require('./boats');
const users = require('./users');

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

function seedCollection(collectionName, initialRecords) {
    MongoClient.connect(process.env.DB_CONN, (err, db) => {
        console.log('connected to database');

        const collection = db.collection(collectionName);
        collection.remove();

        initialRecords.forEach((item) => {
            if (item.password) {
                item.password = bcrypt.hashSync(item.password, 10);
            }
        });

        collection.insertMany(initialRecords, (err, result) => {
            console.log('${result.insertedCount} records inserted.');
            console.log('closing connection...');
            db.close();
            console.log('Done.');
        });
    });
}

seedCollection('boats', boats);
seedCollection('users', users);
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');

function apiRouter(database) {
    const router = express.Router();

    router.delete('/delete/:id', (req, res) => {

        const boatsCollection = database.collection('boats');

        var ObjectID = require('mongodb').ObjectID;

        boatsCollection.remove({ _id: new ObjectID(req.params.id) }, (err, docs) => {
            // if (err) {
            //     return res.status(500).json({ error: 'boat not found' })
            // }
            // if (req.params.id) {
            //     res.status(200).send(docs)
            // } else {
            //     res.status(404).send("No boats found with that ID")
            // }
            if (err) {
                console.log(err);    
                res.send(err); 
            }
            return res.json(docs);
        });
    });
    
    router.use(
        checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: '/api/authenticate'})
    );

    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({ error: err.message });
        }
    });
    
    router.get('/boats', (req, res) => {
        const boat = req.body;

        const boatsCollection = database.collection('boats');

        boatsCollection.find({}).toArray((err, docs) => {
            return res.json(docs);
        });

    });

    router.get('/update/:id', (req, res) => {

        const boatsCollection = database.collection('boats');

        var ObjectID = require('mongodb').ObjectID;

        boatsCollection.findOne({ _id: new ObjectID(req.params.id) }, (err, docs) => {
            // if (err) {
            //     return res.status(500).json({ error: 'boat not found' })
            // }
            // if (req.params.id) {
            //     res.status(200).send(docs)
            // } else {
            //     res.status(404).send("No boats found with that ID")
            // }
            if (err) {
                console.log(err);    
                res.send(err); 
            }
            return res.json(docs);
        });
    });

    router.post('/boats', (req, res) => {
        const boat = req.body;

        const boatsCollection = database.collection('boats');

        boatsCollection.insertOne(boat, (err, r) => {
        if (err) {
            return res.status(500).json({ error: 'Error inserting new record.' });
        }

        const newRecord = r.ops[0];

        return res.status(201).json(newRecord);
        });
    });
  
    router.post('/authenticate', (req, res) => {
        const user = req.body;
        const usersCollection = database.collection('users');

        usersCollection
        .findOne({ username: user.username }, (err, result) => {
            if (!result) {
                return res.status(404).json({ error: 'user not found' });
            }

            if (!bcrypt.compareSync(user.password, result.password)) {
            return res.status(401).json({ error: 'incorrect password '});
            }

            const payload = {
            username: result.username,
            admin: result.admin
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

            return res.json({
            message: 'successfuly authenticated',
            token: token
            });
        });
    });

    router.put('/update', (req, res) => {
        const boat = req.body;
        const boatsCollection = database.collection('boats');

        var ObjectID = require('mongodb').ObjectID;

        boatsCollection.findOneAndUpdate(
            {_id: new ObjectID(boat.id)},
            boat,
            {upsert: true, new: true, runValidators: true}, (err, docs) => {
                if (err) {
                    console.log('error');
                    console.log(err);    
                    res.send(err); 
            }
            return res.json(docs);
        });
    });

  return router;
}

module.exports = apiRouter;

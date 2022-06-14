// Imports ExpressJS and ExpressJS's built-in router
const express = require('express');
const router = express.Router()
module.exports = router;

// Imports the data models from your models folder. 
// Data models specify what data a route will receive. You can set variables in the data model to be required, such as the ID..
// All data you enter must be defined by a model, but if you do not specify them as required, you can omit them from a request. 
// However, you cannot create a request with data outside of the data model.

const Model = require('../models/profileModel');

// Here are some basic methods to interact with the MongoDB database.
// The "Get by ID" method is explained, and the rest follow the same design.


// This assigns the method to the "/get/:id" route under /profiles/
// It is under the /profiles/ route because of the line in the index.js file:
// `const profiles = require('./routes/profiles')`
// This specifies that /routes/profiles.js is under "profiles"
router.get('/get/:id', async (req, res) => {

    // This tries to use the data model to find a MongoDB index by the ID specified in the request parameters (req.params).
    // If there is an ID specified, it will respond (res) with the JSON data collected from MongoDB.
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
        
    }
    // If there is no ID specified, it will catch an error and respond (res) with status 500 (error) and an error message in the JSON format.
    catch(error){
        res.status(500).json({message: error.message})
    }
})


// The following methods follow the same format as the Get by ID method.

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model ({
        _id: req.body.uuid,
        username: req.body.username,
        rank: req.body.rank
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})


//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Success: Document with name "${data.name}" has been deleted.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
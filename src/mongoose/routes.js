const express = require('express');
const { findOneAndUpdate } = require('./model');
const router = express.Router();
const Model = require('./model');

router.get('/getAllTask', async (req, res) => {
    // console.log("done");
    try {
        const get_all_task = await Model.find()
        res.json(get_all_task)
    }
    catch (err) {
        res.send('Error in Get All Task' + err)
    }
});

router.get('/getTask/:id', async (req, res) => {
    try {
        const get_task = await Model.findById(req.params.id)
        res.json(get_task)
    }
    catch (err) {
        res.send('Error in Get Task' + err)
    }
})

router.post('/addTask', async (req, res) => {
    try {
        const insert_task = await Model.create(req.body);
        res.json(insert_task);
    }
    catch (err) {
        res.send('Error in Add Task' + err)
    }
});

router.put('/updateTask/:id', async (req, res) => {
    try {
        const update_task = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        // const update_task = await Model.updateOne({ _id: req.params.id }, { $set: req.body })
        // findOneAndUpdate
        res.json(update_task)
    }
    catch (err) {
        res.send('Error In Put Task' + err)
    }
})
router.patch('/updateTask/:id', async (req, res) => {
    try {
        // const update_task = await Model.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        const update_task = await Model.updateOne({ _id: req.params.id }, { $set: req.body })
        res.json(update_task)
    }
    catch (err) {
        res.send('Error In patch Task' + err)
    }
})

router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const delete_task = await Model.findByIdAndDelete(req.params.id)
        res.json(delete_task)
    }
    catch (err) {
        res.send('Error In Delete Task' + err)
    }
})

router.delete('/deleteAllTask', async (req, res) => {
    try {
        const delete_all_task = await Model.deleteMany();
        res.json(delete_all_task);
    } catch (err) {
        res.send('Error in Delete All Task' + err)
    }
});

module.exports = router
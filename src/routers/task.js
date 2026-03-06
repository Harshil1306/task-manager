const express = require('express');
const router = new express.Router();

const Task = require('../db/models/task');

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
    // Task.find({}).then((task) => {
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

router.patch('/tasks/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpadte = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpadte) {
        return res.status(400).send({error: 'Invalid Update'});
    }

    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/tasks/:id', async (req, res) => {

    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    task.save().then(()=> {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

module.exports = router
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth')

const Task = require('../db/models/task');

router.get('/tasks', auth, async (req, res) => {

    try {
        // const tasks = await Task.find({ owner: req.user._id});
        await req.user.populate('tasks')
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send();
    }
    // Task.find({}).then((task) => {
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id })
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

router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpadte = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpadte) {
        return res.status(400).send({error: 'Invalid Update'});
    }

    const _id = req.params.id;

    try {
        const task = await Task.findOne({_id, owner: req.user._id});

        updates.forEach((update) => task[update] = req.body[update]);

        if (!task) {
            return res.status(404).send();
        }

        await task.save();
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id;

    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id});

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(()=> {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

module.exports = router
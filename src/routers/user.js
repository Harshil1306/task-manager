const express = require('express');
const router = new express.Router();

const User = require('../db/models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        console.log(user)
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(()=> {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

//Once the user is logged in we need to generate an authentication token so that it can we passed on and used while other routes are being called to restrict the access to the perticular user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
    // User.find({}).then((user) => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e);
    }
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

router.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isValidUpadte = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpadte) {
        return res.status(400).send({error: 'Invalid Update'});
    }

    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/users/:id', async (req, res) => {

    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router
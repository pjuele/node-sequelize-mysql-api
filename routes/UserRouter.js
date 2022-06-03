const express = require('express');
const { sep } = require('../helpers/logging');
const router = express.Router();
const Users = require('../services/userController');

// GET many users.
router.get('/', async function (req, res, next) {
    // res.send("Users router!");
    try {
        res.json(await Users.getMultiple());
    } catch (err) {
        console.error(`Error while getting Users' data!`, err.message);
        next(err);
    }
});

// GET one user.
router.get('/:id', async function (req, res, next) {
    try {
        res.json(await Users.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting data for user with id=[${req.params.id}]!`, err.message);
        next(err);
    }
});

// POST user
router.post('/', async function (req, res, next) {
    try {
        res.json(await Users.create(req.body));
    } catch (err) {
        console.error(`Error while creating user`, err.message);
        next(err);
    }
});

// PUT user
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await Users.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating user`, err.message);
        next(err);
    }
});

// DELETE user
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await Users.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting user`, err.message);
        next(err);
    }
});


module.exports = router;
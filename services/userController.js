const { log, sep } = require('../helpers/logging');
const { User } = require('../models/UserModel');

async function getOne(id) {
    return await User.findAll({
        where: {
            id: id
        }
    });
};

async function getMultiple(page = 1) {
    // const offset = helper.getOffset(page, config.listPerPage);
    return await User.findAll();
};

async function create(user) {
    const { name, favoriteColor, age, cash } = user;
    const result = await User.create(
        {
            name,
            favoriteColor,
            age,
            cash
        });

    let message = 'Error in creating user';

    if (result && result instanceof User) {
        message = 'User created successfully';
    }

    return { message };
}

async function update(id, user) {
    const { name, favoriteColor, age, cash } = user;
    const result = await User.update(
        {
            name,
            favoriteColor,
            age,
            cash
        },
        {
            where: {
                id: id
            }
        });

    let message = 'Error in updating user';
    console.dir(result);

    if (result) {
        message = 'User updated successfully';
    }

    return { message };
}

async function remove(id) {
    // should check the id is valid and the user exists... etc.

    const result = await User.destroy({
        where: {
            id: id
        }
    });

    sep();
    log("Delete result is: [" + result + "]", "uController.remove(" + id + ")");

    let message = 'Error in deleting user';
    if (result) {
        message = 'User deleted successfully';
    }
    return { message };
};

module.exports = {
    getOne,
    getMultiple,
    remove,
    create,
    update
};

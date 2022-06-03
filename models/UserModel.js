const { seqHandle } = require('../services/dbConnect');
const { DataTypes } = require('sequelize');

const User = seqHandle.define("user", {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
});

module.exports = {
    User
}
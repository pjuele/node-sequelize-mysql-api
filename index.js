// Before any requires, make sure we have our ENV vars (for all sub-modules to see):
const { logger, log, sep } = require('./helpers/logging');
const EV_ENV_INIT = "🤖 API"

sep();
log(`NODE_ENV is '${process.env.NODE_ENV}'.`, EV_ENV_INIT);

// If we are not in 'production' environment, we need to get environment vars from dotenv:
if (process.env.NODE_ENV !== 'production') {
    // logger.info('Assuming DEV env. - Using dotenv!');
    log('Assuming DEV env. - Using dotenv!', EV_ENV_INIT);
    require('dotenv').config();
};

//_____________________________________________________
// Main require section (after ENV vars):
const express = require("express"); // TODO *** these generic ones from node_modules can go up top!
const helmet = require('helmet');
// var bodyParser = require('body-parser');

const userRouter = require("./routes/UserRouter.js");

//_____________________________________________________
// Initialise Express App and middlewares:
var app = express(); // only really needed if the server has a web front-end. Else socket.io is enough!
app.use(helmet());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Default and router-managed routes:
app.get("/", (req, res) => {
    res.json({ message: "This is not here." });
});
// User API:
app.use("/user", userRouter);

// Error handler middleware:
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

// Fire up the HTTP server:
var server = app.listen(process.env.SERVER_PORT, () => {
    sep()
    log(`listening @ port ${process.env.SERVER_PORT} 📡`, EV_ENV_INIT);
    sep();
}); // start the web server AND
// pull http server out of the express app object so io can use it
// If there was no server web front-end (just socket listening)
// we could just initialise the socket.io object passing in the
// port and options instead of server object and options!


// The rest should go into services!
/*

const request = require('request');
const { Sequelize, DataTypes, Op } = require('sequelize');

const dbC = {
    host: "db4free.net",
    user: "wdpj__root",
    password: "Db4f1970",
    database: "wdpj_node_api",
};

let userData = []
const
    url = "https://jsonplaceholder.typicode.com/users",
    options = { json: true };

// Option 2: Passing parameters separately (sqlite)
try {
    const sequelize = new Sequelize(
        dbC.database,
        dbC.user,
        dbC.password,
        {
            host: dbC.host,
            dialect: 'mysql'
        });

    const User = sequelize.define("user", {
        name: DataTypes.TEXT,
        favoriteColor: {
            type: DataTypes.TEXT,
            defaultValue: 'green'
        },
        age: DataTypes.INTEGER,
        cash: DataTypes.INTEGER
    });

    (async () => {
        //await User.sync({ force: true });

        / *
        request(url, options, (error, res, body) => {
            if (error) {
                return console.log("REQUEST ERROR: " + error)
            };

            if (!error && res.statusCode == 200) {
                // do something with JSON, using the 'body' variable
                userData = [...body];
                // console.dir(userData);
                for (one of userData) {
                    (async () => {
                        const person = await User.create({
                            name: one.name,
                            age: Math.round(Math.random() * 100) + 1,
                            cash: Math.round(Math.random() * 50000)
                        });
                        //console.log(person.toJSON());
                    })();
                    //console.log(one.name + ' was saved to the database!');

                }
                * /
const users = FALL(User);
        / *
    };
    });
* /
    }) ();

} catch (error) {
    console.error('Unable to initialize Sequelize object:', error);
};


async function FALL(model) {
    const data = await model.findAll({
        where: {
            id: {
                [Op.between]: [3, 8]
            }
        }
    });
    console.log("RESULT: " + JSON.stringify(data, null, 2));
    return data;
}



*/
const Sequelize = require('sequelize');

module.exports = new Sequelize('Atom','postgres','qwerty',{
        dialect:'postgres',
        host:'localhost',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
    });




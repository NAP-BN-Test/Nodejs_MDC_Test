const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('Province', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        provinceName: Sequelize.STRING,
        code: Sequelize.STRING,
    });

    return table;
}
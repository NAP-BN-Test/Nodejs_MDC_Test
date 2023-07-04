const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('District', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idProvince: Sequelize.INTEGER,
        unit: Sequelize.STRING,
        districtName: Sequelize.STRING,
        districtFullName: Sequelize.STRING,
        code: Sequelize.STRING,
    });

    return table;
}
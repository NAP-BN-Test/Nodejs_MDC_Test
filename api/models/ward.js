const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('Ward', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idProvince: Sequelize.INTEGER,
        idDistrict: Sequelize.INTEGER,
        unit: Sequelize.STRING,
        wardName: Sequelize.STRING,
        code: Sequelize.STRING,
    });

    return table;
}
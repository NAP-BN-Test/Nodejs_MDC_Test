const database = require('../database');
const mProvince = require('../models/province')
const mDistrict = require('../models/district')
const Op = require("sequelize").Op;
const mWard = require('../models/ward')

module.exports = {
    test: (req, res) => {
        database.connectDatabase().then(async db => {
            if (db) {
                res.send('Connect success')
            } else {
                res.send('Connect Fail')
            }
        })
    },
    province: (req, res) => {
        database.connectDatabase().then(async db => {
            if (db) {
                let result = await mProvince(db).findAll({})
                res.json({
                    data: result,
                    message: 'success'
                })
            } else {
                res.send('Connect Fail')
            }
        })
    },
    district: (req, res) => {
        database.connectDatabase().then(async db => {
            if (db) {
                let params = req.params
                console.log(params);
                let result = await mDistrict(db).findAll({
                    where: {
                        idProvince: params.province,
                    },
                })
                res.json({
                    data: result,
                    message: 'success'
                })
            } else {
                res.send('Connect Fail')
            }
        })
    },
    ward: (req, res) => {
        database.connectDatabase().then(async db => {
            if (db) {
                let params = req.params
                console.log(params);
                let result = await mWard(db).findAll({
                    where: {
                        idDistrict: params.district,
                    },
                })
                res.json({
                    data: result,
                    message: 'success'
                })
            } else {
                res.send('Connect Fail')
            }
        })
    },
    search: (req, res) => {
        database.connectDatabase().then(async db => {
            if (db) {
                let params = req.params
                console.log(params);
                let result = await mWard(db).findAll({
                    where: {
                        [Op.or]: {
                            wardName: {
                                [Op.like]: "%" + params.keyword + "%",
                            },
                            code: {
                                [Op.like]: "%" + params.keyword + "%",
                            }
                        },
                    },
                })
                res.json({
                    data: result,
                    message: 'success'
                })
            } else {
                res.send('Connect Fail')
            }
        })
    },
}
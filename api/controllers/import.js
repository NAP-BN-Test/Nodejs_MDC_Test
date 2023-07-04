const readXlsxFile = require('read-excel-file/node');
const database = require('../database');
const { dirname } = require('path');
const mProvince = require('../models/province')
const mDistrict = require('../models/district')
const mWard = require('../models/ward')

function importExcelData2MySQL(sheetName) {
    let filePath = dirname(require.main.filename) + "/Addresses.xlsx"
    return readXlsxFile(filePath, { sheet: sheetName }).then((rows) => {
        rows.shift()
        return rows;
    })
}
function getCode(value) {

    if (typeof (value) === 'string') {
        const arrString = value?.split(' ')
        const arrFistString = arrString.map(item => item.charAt(0))
        const code = arrFistString
        return arrFistString.join().replaceAll(',', '')
    }
    return null
}

module.exports = {
    import: (req, res) => {
        database.connectDatabase().then(async db => {
            if (db) {
                let provinceDataExcel = await importExcelData2MySQL('Province Code');
                let districtDataExcel = await importExcelData2MySQL('District Code')
                let wardDataExcel = await importExcelData2MySQL('Ward code')
                await mWard(db).destroy({
                    where: {},
                });
                await mDistrict(db).destroy({
                    where: {},
                });
                await mProvince(db).destroy({
                    where: {},
                });
                if (provinceDataExcel) {
                    provinceDataExcel.map(item => {
                        mProvince(db).create({
                            id: item[0],
                            provinceName: item[1],
                            code: getCode(item[1]),
                        })
                    })
                }
                if (districtDataExcel) {
                    districtDataExcel.map(item => {
                        mDistrict(db).create({
                            id: item[0],
                            idProvince: item[1],
                            unit: item[2],
                            districtName: item[3],
                            districtFullName: item[4],
                            code: getCode(item[4])
                        })
                    })
                }
                if (wardDataExcel) {
                    wardDataExcel.map(item => {
                        mWard(db).create({
                            id: item[0],
                            idProvince: item[1],
                            idDistrict: item[2],
                            unit: item[3],
                            wardName: item[4],
                            code: getCode(item[4])
                        })
                    })
                }
                res.json({
                    message: 'import succes',
                })
            } else {
                res.send('Connect Fail')
            }
        })
    }
}
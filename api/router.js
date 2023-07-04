module.exports = function(app) {
    var index = require('./controllers/index');
    var imports = require('./controllers/import');
    app.route('/').get(index.test);
    app.route('/province').get(index.province);
    app.route('/district/:province').get(index.district);
    app.route('/ward/:district').get(index.ward);
    app.route('/search/:keyword').get(index.search);
    app.route('/import').get(imports.import);
}
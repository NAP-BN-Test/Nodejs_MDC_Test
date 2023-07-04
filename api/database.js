const Sequelize = require('sequelize');

module.exports = {
    config: {
        user: 'root',
        password: 'caocesc04',
        server: 'localhost',
        database: 'MDC',
        options: {
            encrypt: false,
        },
    },
    connectDatabase: async function() {
        const db = new Sequelize(this.config.database, this.config.user, this.config.password, {
            host: this.config.server,
            dialect: 'mysql',
            operatorsAliases: '0',
            // Bắt buộc phải có
            dialectOptions: {
                options: { encrypt: false }
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                timestamps: false,
                freezeTableName: true
            }
        });

        db.authenticate()
            .then(() => console.log('Ket noi thanh cong'))
            .catch(err => console.log(err.message));
        return db;
    },
}
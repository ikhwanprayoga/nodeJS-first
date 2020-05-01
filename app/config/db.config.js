module.exports = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        ecquire: 30000,
        idle: 10000
    }
}
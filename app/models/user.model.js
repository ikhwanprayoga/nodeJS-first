module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        username:{
            type: Sequelize.STRING,
            unique: {
                args: true,
                msg: 'Username address already in use!'
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail:true
              },
            unique: {
                args: true,
                msg: 'Email address already in use!'
              }
        },
        password: {
            type: Sequelize.STRING,
        },
        level: {
            type: Sequelize.INTEGER,
        },
        nama: {
            type: Sequelize.STRING,
        },
    })

    return User
}